const { MoleculerClientError } = require('moleculer').Errors;


module.exports = async function (ctx) {
	const { email, password, code } = ctx.params.body;

	const token = await ctx.call('ForgotPasswordModel.findOne', [{ email, code, expired: { $gt: new Date() } }]);

	if (!token) {
		throw new MoleculerClientError("Email or code is invalid!", 422, "", [{ field: "email", message: "is invalid" }, { field: "code", message: "is invalid" }]);
	}

	const updatedUser = await ctx.call('UserModel.findOneAndUpdate', [{ email }, { password: password }]);

	await ctx.call('ForgotPasswordModel.delete', [{ email }]);

	if (updatedUser) {
		return { message: "Reset password successfully" };
	}
}
