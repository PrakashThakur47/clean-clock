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

		return responder(request, response, next, true, 104, new LoginResponse(user).exec());
	}
	catch (error) {
		console.log(error)
		next(error);
	}
}

exports.createUpdateGroup = async (request,response,next) =>{
	try {
		const userId = Object.hasOwn(request.body, 'user_id') ? request.body.user_id : request.user.userId
		if (request.body.activity_id) {
		  const toUpdate = {}
		  if (Object.hasOwn(request.body, 'name')) { toUpdate.name = request.body.name }
		  if (Object.hasOwn(request.body, 'max_occupancy')) { toUpdate.max_occupancy = request.body.max_occupancy }
		  if (Object.hasOwn(request.body, 'min_occupancy')) { toUpdate.min_occupancy = request.body.min_occupancy }
		  if (Object.hasOwn(request.body, 'location')) {
			toUpdate['location.name'] = request.body.location.location
			if (request.body.location.longitude && request.body.location.latitude) { toUpdate['location.coordinates'] = [request.body.location.longitude, request.body.location.latitude] }
		  }
		  if (Object.hasOwn(request.body, 'datetime')) { toUpdate.activity_datetime = new Date(request.body.datetime) }
		  if (Object.hasOwn(request.body, 'recurring')) { toUpdate.recurring = request.body.recurring }
		  if (request.body.recurring_details != null && Object.hasOwn(request.body, 'recurring_details')) {
			const date = new Date()
			let recurring_details
			if (request.body.recurring_details.recurring_type === 'M') {
			  recurring_details = {
				recurring_type: 'M',
				recurring_date: date.getDate(),
				recurring_day: ''
			  }
			} else {
			  recurring_details = {
				recurring_type: 'W',
				recurring_date: '',
				recurring_day: date.getDay()
			  }
			}
			toUpdate.recurring_details = recurring_details
		  }
	
		  if (Object.hasOwn(request.body, 'venmo_id')) { toUpdate.venmo_id = request.body.venmo_id }
		  if (Object.hasOwn(request.body, 'sport')) { toUpdate.sport = request.body.sport }
		  if (Object.hasOwn(request.body, 'skill')) { toUpdate.skill = request.body.skill }
		  if (Object.hasOwn(request.body, 'about')) { toUpdate.about = request.body.about }
		  if (Object.hasOwn(request.body, 'image')) { toUpdate.image = request.body.image }
		  if (Object.hasOwn(request.body, 'cost') && request.body.cost > 0) {
			toUpdate.cost = request.body.cost
			toUpdate.is_paid = true
		  }
		  if (Object.hasOwn(request.body, 'genders_allowed')) { toUpdate.genders_allowed = request.body.genders_allowed }
	
		  if (Object.hasOwn(request.body, 'place_id')) {
			toUpdate.place = request.body.place_id
		  }
		  const updatedActivity = await ActivityService.updateActivity(userId, request.body.activity_id, toUpdate)
		  if (updatedActivity === 339) { return responder(request, response, next, true, 339, {}) }
		  if (updatedActivity === 350) { return responder(request, response, next, true, 350, {}) }
		  if (updatedActivity) { NotificationService.sendEditActivityNotifictions(updatedActivity) }
		  return responder(request, response, next, true, updatedActivity ? 303 : 304, {})
		}
	
		const activity = await ActivityService.createNewActivity(request.body, userId)
		if (!activity) { return responder(request, response, next, true, 129, {}) }
	
		let user
		if (Object.hasOwn(request.body, 'user_id')) {
		  user = await UserService.getUserById(request.body.user_id)
		  Mailer.sendMail([user?.email], [], 'Welcome Aboard | eseo', 'userWelcomeMail.ejs', { name: user?.name, link: activity?.shareable_link })
		}
	
		if (!activity.private) { NotificationService.sendCreateActivityNotification(activity) }
	
		return responder(request, response, next, true, 128, {})
	  } catch (error) {
		next(error)
	  }
}