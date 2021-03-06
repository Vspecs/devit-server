module.exports = {
	authInfo: (user) => {
		return {
			id: user._id,
			permissionLevel: user.permissionLevel,
			username: user.username,
			displayName: user.displayName,
			avatar: user.avatar,
			isActivated: user.isActivated,
			batchYear: user.batchYear,
		};
	},
	profileInfo: (user) => {
		return {
			id: user._id,
			permissionLevel: user.permissionLevel,
			username: user.username,
			displayName: user.displayName,
			avatar: user.avatar,
			banner: user.banner,
			isAlumnus: user.isAlumnus,
			isActivated: user.isActivated,
			roomAddress: user.roomAddress,
			batch: user.batchYear,
			bio: user.bio,
			email: user.email,
			gender: user.gender,
			phone: user.phoneNumber,
			links: {
				linkedin: user.linkedInURL,
				github: user.githubURL,
			},
			experiences: user.experiences,
			learningLevel: user.learningLevel,
			friendsCountData: user.friendsCountData,
		};
	},
	headerInfo: (user) => {
		return {
			avatar: user.avatar,
			banner: user.banner,
			username: user.username,
			displayName: user.displayName,
		};
	},
	rawInfo: (user) => user,
};
