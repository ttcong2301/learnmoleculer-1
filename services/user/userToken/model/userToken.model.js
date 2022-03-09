const mongoose = require('mongoose');

const userTokenSchema = new mongoose.Schema({
	email: {
		type: String,
		require: true,
	},
	createdTime: {
		type: Date,
		require: true,
	},
	expiredTime: {
		type: Date,
		require: true,
	},
	logoutTime: {
		type: Date,
	},
	deviceId: {
		type: String,
		default: '',
	},
	platform: {
		type: String,
		default: '',
	},
	isDisabled: {
		type: Boolean,
		default: false,
	},
});


module.exports = mongoose.model('UserToken', userTokenSchema);
