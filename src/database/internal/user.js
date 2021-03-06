const { v4 } = require("uuid");
const User = require("../models/User");
const LearningLevel = require("../models/Relations/LearningLevel");

module.exports = {
	/**
	 * Activate User and returns updated user.
	 *
	 * @param {String} id Target user ID
	 * @param {Object} data Activation data to be updated
	 * @return {Promise<User>} Returns updated user.
	 */
	activate: async (id, data) => {
		return User.findOneAndUpdate(
			{ _id: id },
			{ $set: { ...data, isActivated: true } },
			{ new: true }
		);
	},
	/**
	 * Check if document exists with given username.
	 *
	 * @param {String} username Target username
	 * @return {Boolean} Returns is given username available.
	 */
	isUsernameAvailable: async (username) => {
		const isAvailable = await User.exists({ username });
		return !isAvailable;
	},
	/**
	 * Get user's raw db document.
	 * @param {String} username Target username
	 * @return {Promise<User>} Returns user's raw document.
	 * @throws {Error} If user is not found.
	 */
	getUserDataByUsername: async (username) => {
		const user = await User.findOne({ username });
		if (!user) {
			throw new Error("User not found.");
		}
		return user;
	},
	/**
	 * Update user's details.
	 * @param {String} id Target user ID
	 * @param {Object} data User's data to be updated
	 * @return {Promise<User>} Returns updated user.
	 * @throws {Error} If user is not found.
	 */
	update: async (id, data) => {
		const user = await User.findOneAndUpdate(
			{ _id: id },
			{ $set: data },
			{ new: true }
		);
		if (!user) {
			throw new Error("User not found.");
		}
		return user;
	},
	/**
	 * Get all users with user ids in array
	 * @param {[String]} userIDs Array of userIDs
	 * @returns {Promise<[Object]>} Returns user objects
	 */
	getAllUsersWithID: async (userIDs) => {
		return User.find({ _id: { $in: userIDs } });
	},
	/**
	 * Add user's experience
	 * @param {String} id Target user ID
	 * @param {Object} exp User's experience data
	 * @return {Promise<User>} Return updated user.
	 * @throws {Error} If user is not found.
	 */
	addExperience: async (id, exp) => {
		exp.uuid = v4();
		const user = await User.findOneAndUpdate(
			{ _id: id },
			{ $push: { experiences: exp } },
			{ new: true }
		);
		if (!user) {
			throw new Error("User not found.");
		}
		return user;
	},
	/**
	 * Delete user's particular experience
	 * @param {String} id Target user ID
	 * @param {String} expID Experience ID to delete
	 * @return {Promise<User>} Return updated user.
	 */
	deleteExperience: async (id, expID) => {
		const user = await User.findOneAndUpdate(
			{ _id: id },
			{ $pull: { experiences: { uuid: expID } } },
			{ new: true }
		);
		if (!user) {
			throw new Error("User not found.");
		}
		return user;
	},
	/**
	 * Add new user's particular room's learning level.
	 * @param {String} userID Target user ID
	 * @param {String} roomID Target room ID
	 * @param {Object} level User's level data
	 * @returns {Promise<String>} Return success message.
	 */
	setNewUserLearningLevel: async (userID, roomID, level) => {
		const newLevel = new LearningLevel({
			user: userID,
			room: roomID,
			level,
		});
		newLevel.save();
		return "User's level added successfully.";
	},
};
