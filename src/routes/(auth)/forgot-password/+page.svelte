<script lang="ts">
	import { showNotification } from '$lib/components/notification/store';
	import type { ActionData } from './$types';

	export let form: ActionData;

	$: {
		if (form?.success) {
			showNotification({
				title: 'Password reset link sent.',
				message: 'A password reset link has been sent to your email.'
			});
		}
	}
</script>

<main>
	<div class="max-w-sm mx-auto my-10">
		<h3 class="text-center font-extrabold font-serif text-3xl">
			Forgot your password?
		</h3>
		<p class="text-center text-slate-400 text-sm">
			Enter your email to get a reset link
		</p>

		<form method="POST" class="rounded-md shadow-md px-6 py-8 mt-6">
			<section>
				<label for="email" class="block font-medium">Your email</label>
				<input
					type="email"
					name="email"
					id="email"
					class="block w-full bg-slate-50 mt-1 px-4 py-2 rounded focus:outline-slate-300"
					class:focus:outline-red-300={!!form?.fieldErrors?.email}
					class:placeholder:text-red-500={!!form?.fieldErrors?.email}
					placeholder="johndoe"
					value={form?.email ?? ''}
					aria-invalid={!!form?.fieldErrors?.email}
					aria-errormessage={form?.fieldErrors?.email?.at(0)}
				/>
				{#if form?.fieldErrors?.email}
					<p class="text-xs text-red-500 mt-1">
						{form?.fieldErrors?.email.at(0)}
					</p>
				{/if}
			</section>

			<section class="mt-5 flex items-center justify-between">
				<a href="/forgot-password" class="text-sm text-indigo-400 group"
					>&larr; <span class="group-hover:underline">Back to login page</span
					></a
				>
				<button
					type="submit"
					class="bg-indigo-500 hover:bg-indigo-400 transition-colors rounded px-6 py-2 text-white font-medium"
					>Reset password</button
				>
			</section>
		</form>
	</div>
</main>
