import { nanoid } from 'nanoid';
import { writable } from 'svelte/store';

export const notificationStore = writable<
	(NotificationsProps & { id: string })[]
>([]);

export type NotificationsProps = {
	id?: string;
	title: string;
	message: string;
	onOpen?(): void;
	onClose?(): void;
	class?: string;
};

export function showNotification({ id, ...params }: NotificationsProps) {
	const key = id ?? nanoid(8);
	notificationStore.update((prev) => [...prev, { id: key, ...params }]);
	return key;
}

export function hideNotification(id: string) {
	notificationStore.update((prev) => {
		return prev.filter((item) => item.id !== id);
	});
}

export function cleanNotifications() {
	notificationStore.set([]);
}
