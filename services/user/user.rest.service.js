const _ = require('lodash');
const { sign } = require('jsonwebtoken');

module.exports = {
	name: 'user.rest',

	/**
	 * Settings
	 */
	settings: {
		JWT_SECRET: process.env.JWT_SECRET || 'secret',
	},

	/**
	 * Dependencies
	 */
	dependencies: [],

	/**
		 * Actions
		 */
	actions: {
		login: {
			rest: {
				method: 'POST',
				fullPath: '/user/login',
				auth: false,
			},
			params: {
				body: {
					$$type: 'object',
					email: {
						type: 'email',
						required: true,
					},
					password: {
						type: 'string',
						required: true,
					},
				}
			},
			handler: require('./actions/login.action'),
		},
		register: {
			rest: {
				method: 'POST',
				fullPath: '/user/register',
				auth: false,
			},
			params: {
				body: {
					$$type: 'object',
					email: 'email|required',
					password: 'string|min:6',
					fullName: 'string|required',
					phone: 'string|required',
					gender: {
						type: 'string',
						enum: ['male', 'female'],
						required: true
					},
					avatar: 'string|optional'
				}
			},
			handler: require('./actions/register.action')
		},
		forgotPassword: {
			rest: {
				method: 'POST',
				fullPath: '/user/forgot-password',
				auth: false,
			},
			params: {
				body: {
					$$type: 'object',
					email: {
						type: 'email',
						required: true,
					},
				}
			},
			handler: require('./actions/forgotPassword.action')
		},
		setNewPassword: {
			rest: {
				method: 'POST',
				fullPath: '/user/reset-password/',
				auth: false,
			},
			params: {
				body: {
					$$type: 'object',
					email: {
						type: 'email',
						required: true,
					},
					password: {
						type: 'string',
						required: true,
					},
					code: {
						type: 'string',
						required: true,
					}
				}
			},
			handler: require('./actions/setNewPassword.action')
		},
		lougout: {
			rest: {
				method: 'GET',
				fullPath: '/user/logout',
				auth: {
					strategies: ['jwt'],
					mode: 'required',
				},
			},
			handler: require('./actions/logout.action'),
		}

	},
	/**
 * Events
 */
	events: {

	},

	/**
* Methods
*/
	methods: {
		generateJWT(payload) {
			return sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });
		}
	},

	/**
* Service created lifecycle event handler
*/
	created() {

	},

	/**
* Service started lifecycle event handler
*/
	async started() {

	},

	/**
* Service stopped lifecycle event handler
*/
	async stopped() {
	},
};
