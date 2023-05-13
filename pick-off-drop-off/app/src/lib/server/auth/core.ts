import type { Handle, RequestEvent } from '@sveltejs/kit';
import type { Auth, CreateUserSessionParams } from './types';
import { redirect } from '@sveltejs/kit';

export class CreateAuthMiddleWare implements Auth {
	constructor(private event: RequestEvent) {}

	get isAuthenticated() {
		return this.event.locals.session.data.token != null;
	}
	public async requireUser() {
		await this.requireUserToken();
		const user = await this.getUser();
		if (user !== null || undefined) return user;

		throw await this.logout();
	}
	public async requireUserToken(redirectTo: string = this.event.url.pathname) {
		// throw await this.logout();
		const userToken = await this.getUserToken();
		if (!userToken) {
			const searchParams = new URLSearchParams([['redirectTo', redirectTo]]);

			throw redirect(302, '/login?' + searchParams);
		}
		return userToken;
	}

	public async logout(redirectTo = '/login') {
		const session = this.event.locals.session;
		try {
			// if (session.data && session.data.token) {
			// await session.destroy();
			const res = await this.event.fetch('http://localhost:3333/logout', {
				headers: {
					Authorization: 'Bearer ' + session.data.token
				},
				method: 'POST'
			});
			const data = await res.json();
			// }
			await session.destroy();
			return redirect(302, redirectTo);
		} catch (error: any) {
			console.log(error);
			return redirect(302, redirectTo);
		}
	}
	public async getUserToken() {
		const session = this.event.locals.session;
		return session.data.token;
	}
	public async getUser() {
		try {
			const userToken = await this.getUserToken();
			if (userToken === (undefined || null)) throw await this.logout();
			const res = await this.event.fetch('http://localhost:3333/api/user', {
				headers: {
					Authorization: 'Bearer ' + userToken
				}
			});
			const data = await res.json();
			const user = data;
			// console.log("p");
			if (user) return user;
			throw await this.logout();
		} catch (error: any) {
			console.log({
				cause: error.message,
				message: error.response?.data.message
			});
			throw await this.logout();
		}
	}
	public async createUserSession({
		login_code,
		redirectTo
	}: CreateUserSessionParams): Promise<any> {
		let isOk = false;
		let url: string;
		try {
			const session = this.event.locals.session;
			const email = session.data.email;

			const res = await this.event.fetch('http://localhost:3333/login/verify', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					login_code,
					email
				})
			});
			const data = await res.json();
			if (!res.ok) {
				return { login_code, error: data };
			}
			await session.set({ token: data.token });
			await session.update((v) => ({ ...v, email: null, success_message: null }));

			// console.log('Email', session.data.email);
			// throw redirect(302, redirectTo);
			isOk = true;
			url = redirectTo;
		} catch (error: any) {
			return {
				error: { message: error.message }
			};
		}
		if (isOk) {
			throw redirect(302, url);
		}
	}
}
