const bcrypt = require("bcryptjs");
const _ = require('lodash');
const { MoleculerClientError } = require('moleculer').Errors;

module.exports = async function (ctx) {
	let entity = ctx.params.body;

	if (entity.email) {
		const found = await ctx.call('UserModel.findOne', [{ email: entity.email }]);
		if (found)
			throw new MoleculerClientError("Email is exist!", 422, "", [{ field: "email", message: "is exist" }]);
	}

	const user = await ctx.call('UserModel.create', [entity]);
	const accessToken = this.schema.methods.generateJWT(user.toJSON());

	return { user: _.pick(user, ['email', 'fullName', 'phone', 'gender', 'avatar']), accessToken };

}
