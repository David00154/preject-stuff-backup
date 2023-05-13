import { fail, json, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { z } from 'zod';
import { deserialize } from '$app/forms';
export const actions = {
	default: async ({ request, fetch, locals }) => {
		let isOk = false;
		let params: URLSearchParams;
		try {
			const body = Object.fromEntries(await request.formData());

			const schema = z.object({
				email: z.string().trim().email({ message: 'Email must be a valid email address' })
			});

			const parsed = schema.safeParse(body);

			if (!parsed.success) {
				// console.log(parsed.error.format().email?._errors[0]);

				return fail(400, {
					email: body.email,
					error: { email: parsed.error.format().email }
				});
			}
			const email = parsed.data.email;

			const res = await fetch('http://localhost:3333/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ email })
			});
			const data = await res.json();

			if (!res.ok) {
				return { error: data };
			}
			await locals.session.set({
				success_message: `Enter the 4-digit code sent to you at:`,
				email
			});
			const param = new URL(request.url).searchParams.get('redirectTo');
			const searchParams = new URLSearchParams([['redirectTo', param ?? '/']]);

			isOk = true;
			params = searchParams;
		} catch (error: any) {
			return {
				error: { message: error.message }
			};
		}
		if (isOk) {
			throw redirect(303, '/verify?' + params);
		}
	}
} satisfies Actions;
