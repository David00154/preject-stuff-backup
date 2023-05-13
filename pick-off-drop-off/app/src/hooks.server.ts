import { handleAuth } from '$lib/server/auth';

import { handleSession } from 'svelte-kit-cookie-session';

export const handle = handleSession(
	{
		secret: 'SOME_COMPLEX_SECRET_AT_LEAST_32_CHARS',
		cookie: {
			httpOnly: true,
			path: '/',
			sameSite: 'lax',
			secure: process.env.NODE_ENV === 'production'
		},
		key: '__session',
		expires: 2
	},
	handleAuth(async ({ event, resolve }) => {
		return resolve(event);
	})
);
