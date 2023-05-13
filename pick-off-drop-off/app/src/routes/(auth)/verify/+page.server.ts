import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { z } from 'zod';

export const load = async function ({ locals }) {
	// console.log(await locals.auth.requireUser());
	// await locals.auth.requireUserToken();
	const session = locals.session;
	if (!session.data.email) {
		throw redirect(302, '/login');
	}
	const res = {
		email: session.data.email,
		success: session.data.success_message
	};

	// await session.update((v) => ({ ...v, success_message: null }));
	return { ...res };
} satisfies PageServerLoad;

export const actions = {
	default: async ({ request, locals }) => {
		const body = Object.fromEntries(await request.formData());

		const schema = z.object({
			login_code: z.string().min(4, { message: "The email passcode you've entered is incorrect." })
		});

		const parsed = schema.safeParse(body);

		if (!parsed.success) {
			return fail(400, {
				login_code: body.login_code,
				error: { login_code: parsed.error.format().login_code }
			});
		}
		const code = parsed.data.login_code;
		const redirectTo = new URL(request.url).searchParams.get('redirectTo');

		return await locals.auth.createUserSession({
			login_code: code,
			redirectTo: redirectTo ?? '/'
		});
	}
} satisfies Actions;
