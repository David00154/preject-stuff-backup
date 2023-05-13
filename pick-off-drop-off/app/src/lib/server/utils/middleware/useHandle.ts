import type { Handle, ResolveOptions } from '@sveltejs/kit';
import type { MaybePromise } from '@sveltejs/kit/types/private';

type maybeFunction = MaybePromise<(next: Handle) => Handle>;

// type middlewareParams = Handle & {
// 	next: Handle;
// };
// type middlewareParams = {
// 	next: () => Handle;
// };
type useMiddleWareParams = Handle[];
// let y: pFPX = {
// 	next({event, resolve}) {
// 		return resolve(event)
// 	}
// }

export const useMiddleWare = function (...params: useMiddleWareParams): Handle {
	return async function handle(vals) {
		let res: Handle = async ({ event, resolve }) => resolve(event);
		let index = 0;
		// for (let index = 0; index < params.length; index++) {
		// 	if (index !== params.length - 1) {
		// 		let current = params[index];
		// 		// 	// 	let current = params[index];
		// 		const next = params[index + 1];
		// 		// current.bind(next);
		// 		await current(vals, next);

		// 		// 	// 	// await next(vals);
		// 		// 	// 	res = next;
		// 		// 	await current(vals);
		// 		// 	// 	// continue;
		// 	}
		// 	// 	// if (index === params.length - 1) {
		// 	// 	// 	let current = params[index];
		// 	// 	// 	res = current;
		// 	// 	// }
		// }
		// function reEval() {}
		return await res(vals);
	};
};
