const _ = require('lodash');
const MeAPI = require('../../serviceDependencies/MEAPI');
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
						type: 'string',
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
					email: {
						type: 'email',
						required: true,
					},
					password: {
						type: 'string',
						required: true,
					},
					fullName: {
						type: 'string',
						required: true,
					},
					phone: {
						type: 'string',
						required: true,
					},
					gender: {
						type: 'string',
						enum: ['male', 'female'],
						required: true
					},
					avatar: {
						type: 'string',
						required: false
					}
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
		const url = process.env.FE_URL;
		const isSecurity = process.env.FE_SECURITY === 'true';
		const privateKey = process.env.FE_PRIVATEKEY;
		const publicKey = process.env.FE_PUBLICKEY;

		this.historyService = new MeAPI({
			url, publicKey, privateKey, isSecurity, 'x-api-client': 'app',
		});
	},

	/**
* Service stopped lifecycle event handler
*/
	async stopped() {
	},
};
