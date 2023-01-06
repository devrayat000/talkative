import { writable } from 'svelte/store';
import client from '../pocketbase/client';

export const authStore = writable(JSON.stringify(client.authStore, null, 2));
