const bcrypt = require("bcryptjs");
const _ = require('lodash');
const { MoleculerClientError } = require('moleculer').Errors;

module.exports = async function (ctx) {
	const { email, password } = ctx.params.body;

	const user = await ctx.call('UserModel.findOne', [{ email }]);
	if (!user)
		throw new MoleculerClientError("Email or password is invalid!", 422, "", [{ field: "email", message: "is invalid" }, { field: "password", message: "is invalid" }]);

	const res = await bcrypt.compare(password, user.password);
	if (!res)
		throw new MoleculerClientError("Wrong password!", 422, "", [{ field: "password", message: "wrong password" }]);

	const now = Date.now();

	const userToken = await ctx.call('UserTokenModel.create', [{ email, createdTime: now, expiredTime: now + (1000 * 60 * 60 * 24 * 7) }]); // 1 week

	const accessToken = this.schema.methods.generateJWT({ email: user.email, userTokenId: userToken._id });

	return { user: _.pick(user, ['email', 'fullName', 'phone', 'gender', 'avatar']), accessToken };

}
