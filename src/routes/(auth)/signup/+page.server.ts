import client from '$lib/pocketbase/client';
import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import { signupSchema } from './validation';
import { forgotpasswordSchema } from '../forgot-password/validation';

export const actions: Actions = {
	register: async ({ request }) => {
		const formData = await request.formData();

		const name = formData.get('name')?.toString();
		const email = formData.get('email')?.toString();
		const password = formData.get('password')?.toString();
		const passwordConfirm = formData.get('passwordConfirm')?.toString();

		const parsed = signupSchema.safeParse({
			name,
			email,
			password,
			passwordConfirm
		});

		if (!parsed.success) {
			return fail(400, {
				name,
				email,
				password,
				passwordConfirm,
				...parsed.error.flatten()
			});
		}

		await client.collection('users').create({
			...parsed.data,
			emailVisibility: true
		});
		const success = await client
			.collection('users')
			.requestVerification(parsed.data.email);

		return { success, email: parsed.data.email };
	},
	verify: async ({ request }) => {
		const formData = await request.formData();

		const email = formData.get('email')?.toString();

		const parsed = forgotpasswordSchema.safeParse({
			email
		});

		if (!parsed.success) {
			return fail<{
				formErrors: string[];
				fieldErrors: {
					passwordConfirm?: string[] | undefined;
					name?: string[] | undefined;
					email?: string[] | undefined;
					password?: string[] | undefined;
				};
				name: string | undefined;
				email: string | undefined;
				password: string | undefined;
				passwordConfirm: string | undefined;
			}>(400, {
				email,
				name: undefined,
				password: undefined,
				passwordConfirm: undefined,
				...parsed.error.flatten()
			});
		}

		const success = await client
			.collection('users')
			.requestVerification(parsed.data.email);

		return { success, email: parsed.data.email };
	}
};
