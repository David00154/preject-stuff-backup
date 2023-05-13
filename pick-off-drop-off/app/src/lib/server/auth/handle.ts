import type { Handle } from '@sveltejs/kit';
import { CreateAuthMiddleWare } from './core';

export function handleAuth(
	passedHandle: Handle = async ({ event, resolve }) => resolve(event)
): Handle {
	return async function hanlde({ event, resolve }) {
		const auth = new CreateAuthMiddleWare(event);

		(event.locals as any).auth = auth;

		const res = await passedHandle({ event, resolve });

		return res;
	};
}
