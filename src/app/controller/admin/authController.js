const AdminService = require("../../../service/AdminService.js");
const bcrypt = require("bcryptjs");
const responder = require("../../../util/responder");
const LoginResponse = require("../../../resource/admin/LoginResponse");


exports.login = async (request, response, next) => {
	try {
		const { email, password } = request.body;
		const user = await AdminService.getUserbyEmail(email);
		if (!user)
			return responder(request, response, next, true, 102, {});
	
		let comparePassword = await bcrypt.compare(password, user.password);
		if (!comparePassword)
			return responder(request, response, next, true, 103, {});

		return responder(request, response, next, true, 104, new LoginResponse().exec());
	}
	catch (error) {
		console.log(error)
		next(error);
	}
}
