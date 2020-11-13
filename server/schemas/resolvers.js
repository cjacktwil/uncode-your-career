const { AuthenticationError, attachConnectorsToContext } = require('apollo-server-express');
const { User, Jobs } = require('../models');
// const jobSchema = require('../models/Jobs');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne(
          { _id: context.user._id })
          .select('-__v -password')
          .populate('savedJobs');

        return userData;
      }

      throw new AuthenticationError('Not logged in');
    },


    myJobs: async (parent, args, context) => {
      if (context.user) {
        const params = {user_id: context.user._id};
         return Jobs.find(params);
          // return mySavedJobs;
        }
      throw new AuthenticationError('Not logged in');
    },
    allJobs: async () => {
      return Jobs.find().sort({ created_at: -1 })
    },
    // searchJobs: async (parent, { title, location, type }) => {
    //   const params = title ? { title } : {} && location ? { location } : {} && type ? { type } : {};
    //   return Jobs.find(params).sort({ created_at: -1 });
    // },
    // savedJobs: async (parent, { saved }) => {
    //   return Jobs.find(saved).sort({created_at: -1});
    // },
    // job: async (parent, { id }) => {
    //   return Jobs.findOne(id)
    // }
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { username, password }) => {
      const user = await User.findOne({ username });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);
      return { token, user };
    },

    saveJob: async (parent, { input }, context) => {
      if (context.user) {

        const newJob = await Jobs.create({...input, user_id: context.user._id});
        console.log(newJob);

        await User.findByIdAndUpdate(
          {_id: context.user._id},
          { $push: { savedJobs: newJob._id } },
          { new: true });
        return newJob;
      }
      throw new AuthenticationError('You must log in to save a job.');
    },

    updateJob: async(parent, {_id, applied, application_date, notes}) => {
      const updatedJob = await Jobs.findByIdAndUpdate(
        {_id: _id},
        {$set: {applied: applied, application_date: application_date, notes: notes}},
        {new: true});
        return updatedJob;
    },

removeJob: async (parent, { _id }, context) => {
  if (context.user) {

    const updatedUser = await User.findByIdAndUpdate(
      {_id: context.user._id},
      {$pull: {savedJobs: {_id: _id}}},
      {new: true});

     const deletedJob = await Jobs.findByIdAndDelete({_id});
     return deletedJob;
  
  }
  throw new AuthenticationError('You must be logged in to manage your jobs.');
}
  },

};

module.exports = resolvers;
