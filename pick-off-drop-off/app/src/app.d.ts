// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

interface SessionData {
	success_message?: string | null;
	email?: string | null;
	token?: string | null;
}
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			session: import('svelte-kit-cookie-session').Session<SessionData>;
			auth: import('./lib/server/auth').Auth;
		}

		interface PageData {
			session?: SessionData;
		}
		// interface Platform {}
	}
}

export {};
