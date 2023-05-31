const db = require('../config/connection');
const { User, Bucket } = require('../models');
const userSeeds = require('./userSeeds.json');
const bucketSeeds = require('./bucketSeeds.json');

db.once('open', async () => {
  try {
    await Bucket.deleteMany({});
    await User.deleteMany({});

    const createdUsers = await User.create(userSeeds);

    for (let i = 0; i < bucketSeeds.length; i++) {
      const { _id } = await Bucket.create({
        title: bucketSeeds[i].title,
        description: bucketSeeds[i].description,
        status: bucketSeeds[i].status,
        dueDate: bucketSeeds[i].dueDate,
        priority: bucketSeeds[i].priority,
        isOverDue: bucketSeeds[i].isOverDue,
        user: createdUsers[i]._id
      });

      createdUsers[i].buckets.push(_id);
      await createdUsers[i].save();
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});
