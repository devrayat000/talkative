import client from '$lib/pocketbase/client';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { loginSchema } from './validation';

export const actions: Actions = {
	default: async ({ request, url }) => {
		const formData = await request.formData();
		const identity = formData.get('identity')?.toString();
		const password = formData.get('password')?.toString();

		const parsed = loginSchema.safeParse({
			identity,
			password
		});

		if (!parsed.success) {
			return fail(400, { identity, password, ...parsed.error.flatten() });
		}

		await client
			.collection('users')
			.authWithPassword(parsed.data.identity, parsed.data.password);

		throw redirect(307, url.searchParams.get('_next') || '/');
	}
};
