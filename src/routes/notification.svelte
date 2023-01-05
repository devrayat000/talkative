<script lang="ts">
	import { fly } from 'svelte/transition';
	import { sineInOut } from 'svelte/easing';
	import {
		notificationStore,
		hideNotification
	} from '$lib/components/notification/store';
</script>

<slot />

{#each $notificationStore as notification (notification.id)}
	<div
		role="alertdialog"
		class="fixed bottom-3 right-3"
		transition:fly={{ x: 200, easing: sineInOut, duration: 250 }}
		on:introstart={notification.onOpen}
		on:outroend={notification.onClose}
	>
		<div
			class="bg-white rounded-md shadow-md py-2.5 px-3.5 relative {notification.class ??
				''}"
		>
			<button
				type="button"
				class="absolute top-2 right-2 text-slate-900 text-sm"
				on:click={() => hideNotification(notification.id)}>&#x2715;</button
			>
			<h4 class="text-sm font-semibold">{notification.title}</h4>
			<p class="text-xs text-slate-600">{notification.message}</p>
		</div>
	</div>
{/each}
