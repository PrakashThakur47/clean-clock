const User = require('../model/User');
const UserGroupDetail = require('../model/User_Group');

exports.findOrCreateUser = async data => {
	let user = await User.findOne({ contact: data.phone_number });

	if (!user)
		user = await createUserWithContactNumber(data.phone_number);

	return user;
}

let createUserWithContactNumber = async contactNumber => {
	let user = new User({ contact: contactNumber });
	return user.save() ? user : false;
}

exports.updateUserDetails = async (userId, data) => {
	let user = await User.findOneAndUpdate({ _id: userId }, data);
	return user;
}

exports.createUserGroupDetails = async (data) => {
	let user = await UserGroupDetail.create(data);
	return user;
}

exports.getUserGroupDetails = async (userId) => {
	let user = await UserGroupDetail.find({user_id: userId}, '_id createdAt').populate({path: 'user_id', select: 'email'}).populate({path: 'group_id', select: '_id name description total_user createdAt'});
	return user;
}

exports.resetStreak = async (userId, group_id) => {
	let user = await UserGroupDetail.findOneAndUpdate({user_id: userId, group_id}, {current_streak: 0})
	return user;
}

exports.getGroupDetails = async (userId, group_id) => {
	let user = await UserGroupDetail.findOne({user_id: userId, group_id}, 'group_details').populate({path: 'group_id', select: '_id name description total_user createdAt'});
	return user;
}

exports.updateUserStreak = async () => {
	const groups = await UserGroupDetail.find({})
	groups.map( async (group) => {
		const streak = Number(group.current_streak) + 1
		await UserGroupDetail.findOneAndUpdate({_id : group._id}, {current_streak: streak})
	})
	return 'Updated';
}

exports.userProfile = async (user_id) =>{
	let user = await User.find({_id: user_id, is_onboarded:true})
	return user
}


exports.getAllUsers = async () =>{
	let users = await User.find({is_onboarded:true, group_exist: true})
	const userList = []
	const data = await Promise.all(users.map(async user => {
		const groups = await UserGroupDetail.count({user_id: user._id})
			userList.push({...user._doc, group_count: groups})
		return user;
	  }))
	
	return userList
}