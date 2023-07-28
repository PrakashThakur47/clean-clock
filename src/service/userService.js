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

exports.userProfile = async (user_id) =>{
	let user = await User.find({_id: user_id, is_onboarded:true})
	return user
}

exports.fetchGroups = async () => {
	
}