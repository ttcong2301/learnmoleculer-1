const bcrypt = require("bcryptjs");
const _ = require('lodash');
const { MoleculerClientError } = require('moleculer').Errors;
const randomString = require('randomstring');

module.exports = async function (ctx) {
	const { email } = ctx.params.body;

	const user = await ctx.call('UserModel.findOne', [{ email }]);
	if (!user)
		throw new MoleculerClientError("Email or password is invalid!", 422, "", [{ field: "email", message: "is not found" }]);

	await ctx.call('ForgotPasswordModel.deleteMany', [{ email }]);

	const code = randomString.generate({
		length: 10,
		charset: 'alphanumeric'
	});

	const mail = await ctx.call('Mail.send', {
		to: email,
		subject: 'Forgot Password',
		text: `Your code is ${code}`
	});

	console.log(mail);

	const expired = new Date();
	expired.setHours(expired.getHours() + 1);

	await ctx.call('ForgotPasswordModel.create', [{ email, code, expired }]);

	return { message: 'Request forgot password successfully' };

}
