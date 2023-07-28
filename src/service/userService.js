const User = require('../model/User')

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