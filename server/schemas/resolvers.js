const { User, Bucket } = require('../models');
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
  Query: {
    buckets: async () => {
      return await Bucket.find();
    },
    bucket: async (_, { id }) => {
      return await Bucket.findById(id);
    },
    user: async (_, { id }) => {
      return await User.findById(id);
    },

    currentUser: async (_, __, { user }) => {
      if (!user) {
        throw new AuthenticationError('Not authenticated');
      }
    
      const { email, username, _id } = user;
    
      // Fetch the user from the database using the provided information
      const fetchedUser = await User.findById(_id).populate('buckets');
    
      if (!fetchedUser) {
        throw new Error('Failed to fetch user');
      }
    
      return fetchedUser;
    },
    

    usersWithBuckets: async () => {
      return await User.find().populate('buckets');
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    signIn: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError('Invalid credentials');
      }
      const correctPassword = await user.isCorrectPassword(password);
      if (!correctPassword) {
        throw new AuthenticationError('Invalid credentials');
      }
      return {
        token: signToken(user),
        user,
      };
    },

   
    createBucket: async (parent, { title, description, status, dueDate, priority }, context) => {
      if (!context.user) {
        throw new AuthenticationError('Not authenticated');
      }
    
      // Set the default due date to one year from the current date if not provided by the user
      const defaultDueDate = new Date();
      defaultDueDate.setFullYear(defaultDueDate.getFullYear() + 1);
    
      const bucket = await Bucket.create({
        title: title,
        description: description,
        status: status || 'Not Started',
        dueDate: dueDate || defaultDueDate,
        priority: priority || 1,
        createdBy: context.user._id,
      });
    
      await User.findOneAndUpdate(
        { _id: context.user._id },
        { $push: { buckets: bucket._id } },
        { new: true }
      ).populate('buckets');
    
      return bucket;
    },

    deleteBucket: async (parent, { id }, context) => {
    
      if (!context.user) {
        throw new Error('Authentication required');
      }
      // Check if the user is logged in
      const userId = context.user._id;

      // Find the user by their ID and check if the bucket with the provided ID belongs to the user
      const user = await User.findOne({ _id: userId, buckets: id });

     // Check if the user exists and owns the bucket
      if (!user) {
        throw new Error('Unauthorized');
      }

       // Delete the bucket
      const deletedBucket = await Bucket.findByIdAndDelete(id);

       // Check if the deleted bucket exists
      if (!deletedBucket) {
        throw new Error('Bucket not found');
      }

      return deletedBucket;
    },

    updateBucket: async (parent, { id, title, description, status, dueDate, priority }, context) => {
      if (!context.user) {
        throw new AuthenticationError('Not authenticated');
      }
    
      const bucket = await Bucket.findById(id);
      if (!bucket) {
        throw new Error('Bucket not found');
      }
    
      bucket.title = title || bucket.title;
      bucket.description = description || bucket.description;
      bucket.status = status || bucket.status;
      //bucket.dueDate = dueDate ? new Date(dueDate) : bucket.dueDate; // Convert the dueDate to a Date object if provided
      bucket.dueDate = dueDate;
      bucket.priority = priority || bucket.priority;
    
      await bucket.save();
    
      return bucket
    },
    
    addNoteToBucket: async (_, { bucketId, content }) => {
      const bucket = await Bucket.findById(bucketId);
      if (!bucket) {
        throw new Error('Bucket not found');
      }
      bucket.notes.push({ content, createdAt: new Date().toISOString() });
      await bucket.save();
      return bucket.notes[bucket.notes.length - 1];
    },

    deleteNoteFromBucket: async (parent, { bucketId, noteId }) => {
      const bucket = await Bucket.findByIdAndUpdate(bucketId, { $pull: { notes: { _id: noteId } } }, { new: true })
        .populate('notes');
      return bucket;
    },
  },
};

module.exports = resolvers;
