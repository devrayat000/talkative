import type { Action } from 'svelte/action';
import { tick } from 'svelte';

export default (function portal(node, target = document.body) {
	async function update(newTarget: HTMLElement) {
		if (newTarget === null) {
			await tick();
		}
		newTarget.appendChild(node);
	}
	function destroy() {
		node.remove();
	}
	update(target);

	return {
		update,
		destroy
	};
} satisfies Action<HTMLElement, HTMLElement>);
