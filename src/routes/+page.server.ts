import client from '$lib/pocketbase/client';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	return JSON.parse(JSON.stringify(client.authStore));
};
