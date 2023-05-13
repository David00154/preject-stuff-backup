import { type Session } from 'svelte-kit-cookie-session';
import type { HttpError, RequestEvent } from '@sveltejs/kit';

export type CreateUserSessionParams = {
	redirectTo: string;
	login_code: string;
};

type OptimisitcType = Response | HttpError | never;

export interface Auth {
	isAuthenticated: boolean;
	createUserSession: (params: CreateUserSessionParams) => Promise<OptimisitcType | any>;
	requireUser: () => Promise<OptimisitcType | any>;
	requireUserToken: (redirectTo?: string) => Promise<string>;
	logout: (redirectTo?: string) => Promise<OptimisitcType | any>;
	getUserToken: () => Promise<string | undefined | null>;
	getUser: () => Promise<any>;
}
