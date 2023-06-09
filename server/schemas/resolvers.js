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
        throw new Error('Authentication required');
      }
    
      const userId = context.user._id;
    
      // Find the user by their ID and check if the bucket with the provided ID belongs to the user
      const user = await User.findOne({ _id: userId, buckets: id });
    
      if (!user) {
        throw new Error('Unauthorized');
      }
    
      // Find the bucket
      const bucket = await Bucket.findById(id);
    
      if (!bucket) {
        throw new Error('Bucket not found');
      }
    
      // Update the bucket properties if input values are provided
      bucket.title = title || bucket.title;
      bucket.description = description || bucket.description;
      bucket.status = status || bucket.status;
      bucket.dueDate = dueDate || bucket.dueDate;
      bucket.priority = priority || bucket.priority;
      // Update other properties as needed
    
      // Save the changes to the database
      const updatedBucket = await bucket.save();
    
      return updatedBucket;
    },
    
     //Adding notes to buckets. Only loggedIn users add notes to buckets which belongs to them
    addNoteToBucket: async (_, { bucketId, content }, context) => {
      if (!context.user) {
        throw new Error('Authentication required');
      }
    
      const userId = context.user._id;
    
      // Find the user by their ID and check if the bucket with the provided ID belongs to the user
      const user = await User.findOne({ _id: userId, buckets: bucketId });
    
      if (!user) {
        throw new Error('Unauthorized');
      }
    
      const bucket = await Bucket.findById(bucketId);
      if (!bucket) {
        throw new Error('Bucket not found');
      }
    
      bucket.notes.push({ content, createdAt: new Date().toISOString() });
      await bucket.save();
    
      return bucket.notes[bucket.notes.length - 1];
    },
    
    deleteNoteFromBucket: async (parent, { bucketId, noteId }) => {
      // Find the bucket by ID
      const bucket = await Bucket.findById(bucketId);
    
      // Check if the bucket exists
      if (!bucket) {
        throw new Error('Bucket not found');
      }
    
      // Find the index of the note to be deleted in the notes array
      const noteIndex = bucket.notes.findIndex(note => note._id.toString() === noteId);
    
      // Check if the note exists
      if (noteIndex === -1) {
        throw new Error('Note not found');
      }
    
      // Remove the note from the notes array
      const deletedNote = bucket.notes.splice(noteIndex, 1)[0];
    
      // Save the changes to the bucket
      await bucket.save();
    
      return deletedNote;
    },
    
  },
};

module.exports = resolvers;
