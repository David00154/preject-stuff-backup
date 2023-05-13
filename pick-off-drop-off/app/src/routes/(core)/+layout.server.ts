import type { LayoutServerLoad } from './$types';

export const load = async function ({ locals }) {
	const user = await locals.auth.requireUser();
	return {
		user
	};
} satisfies LayoutServerLoad;
