const mongoose = require('mongoose');

const forgotPasswordSchema = new mongoose.Schema({
	email: {
		type: String,
		require: true,
		unique: true,
	},
	code: {
		type: String,
		require: true,
	},
	expired: {
		type: Date,
		require: true,
	},

});

module.exports = mongoose.model('ForgotPassword', forgotPasswordSchema);
