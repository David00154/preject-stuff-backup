import type { RequestHandler, RouteParams } from './$types';

// const logOut = async function (locals: App.Locals) {
// 	// cookies.delete('token');
// 	if (locals.session.data && locals.session.data.token) {
// 		await locals.session.destroy();
// 	}
// 	console.log('LOGGED OUT');
// 	throw redirect(302, '/login');
// };

export const GET = async function ({ locals }) {
	throw await locals.auth.logout('/login');
} satisfies RequestHandler;

export const POST = async function ({ locals }) {
	throw await locals.auth.logout('/login');
} satisfies RequestHandler;
