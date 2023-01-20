<script lang="ts">
	import { fade } from 'svelte/transition';
	import type { ActionData } from './$types';

	export let form: ActionData;

	$: initial = !!form?.success;

	function goBack() {
		initial = !initial;
	}
</script>

<main>
	{#if initial}
		<div
			in:fade={{ delay: 250 }}
			out:fade={{ duration: 250 }}
			class="max-w-sm mx-auto my-10"
		>
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
					<a href="/login" class="text-sm text-indigo-400 group"
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
	{:else}
		<div
			class="max-w-sm mx-auto my-10"
			in:fade={{ delay: 250 }}
			out:fade={{ duration: 250 }}
		>
			<h3 class="text-center font-extrabold font-serif text-3xl">
				Reset your password!
			</h3>
			<p class="text-center text-slate-400 text-sm">
				Please reset your password via the link sent to your inbox.
			</p>

			<form
				method="POST"
				class="rounded-md shadow-md px-6 py-8 mt-6"
				action="?/verify"
			>
				<input type="hidden" name="email" value={form?.email} />
				<section>
					<label for="email" class="block">Did not recieve email?</label>
					<button
						class="w-full mt-3 bg-emerald-500 hover:bg-emerald-400 transition-colors rounded px-8 py-2 text-white font-medium"
						type="submit"
					>
						Resend mail
					</button>
				</section>

				<section class="mt-4 flex flex-col items-center">
					<span class="block text-sm text-slate-800">Or,</span>
					<button
						type="button"
						class="block mt-1 appearance-none text-indigo-400 group"
						on:click={goBack}
					>
						&larr; <span class="group-hover:underline">Go back</span>
					</button>
				</section>
			</form>
		</div>
	{/if}
</main>
