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
			class="max-w-sm mx-auto my-10"
			in:fade={{ delay: 250 }}
			out:fade={{ duration: 250 }}
		>
			<h3 class="text-center font-extrabold font-serif text-3xl">
				Welcome to Talkatives!
			</h3>
			<p class="text-center text-slate-400 text-sm">
				Already have an account? <a
					href="/login"
					class="text-indigo-400 hover:underline">Log In</a
				>
			</p>

			<form
				method="POST"
				class="rounded-md shadow-md px-6 py-8 mt-6"
				action="?/register"
			>
				<section>
					<label for="name" class="block font-medium">Full Name</label>
					<input
						type="text"
						name="name"
						id="name"
						class="block w-full bg-slate-50 mt-1 px-4 py-2 rounded focus:outline-slate-300"
						class:focus:outline-red-300={!!form?.fieldErrors?.name}
						class:placeholder:text-red-500={!!form?.fieldErrors?.name}
						placeholder="John Doe"
						value={form?.name ?? ''}
						aria-invalid={!!form?.fieldErrors?.name}
						aria-errormessage={form?.fieldErrors?.name?.at(0)}
					/>
					{#if form?.fieldErrors?.name}
						<p class="text-xs text-red-500 mt-1">
							{form?.fieldErrors?.name.at(0)}
						</p>
					{/if}
				</section>
				<section class="mt-4">
					<label for="email" class="block font-medium">Email</label>
					<input
						type="text"
						name="email"
						id="email"
						class="block w-full bg-slate-50 mt-1 px-4 py-2 rounded focus:outline-slate-300"
						class:focus:outline-red-300={!!form?.fieldErrors?.email}
						class:placeholder:text-red-500={!!form?.fieldErrors?.email}
						placeholder="johndoe@gmail.com"
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
				<section class="mt-4">
					<label for="password" class="block font-medium">Password</label>
					<input
						type="password"
						name="password"
						id="password"
						class="block w-full bg-slate-50 mt-1 px-4 py-2 rounded focus:outline-slate-300 placeholder:translate-y-0.5"
						class:focus:outline-red-300={!!form?.fieldErrors?.password}
						class:placeholder:text-red-500={!!form?.fieldErrors?.password}
						placeholder="********"
						aria-invalid={!!form?.fieldErrors?.password}
						aria-errormessage={form?.fieldErrors?.password?.at(0)}
					/>
					{#if form?.fieldErrors?.password}
						<p class="text-xs text-red-500 mt-1">
							{form?.fieldErrors?.password.at(0)}
						</p>
					{/if}
				</section>
				<section class="mt-4">
					<label for="passwordConfirm" class="block font-medium"
						>Confirm Password</label
					>
					<input
						type="password"
						name="passwordConfirm"
						id="passwordConfirm"
						class="block w-full bg-slate-50 mt-1 px-4 py-2 rounded focus:outline-slate-300 placeholder:translate-y-0.5"
						class:focus:outline-red-300={!!form?.fieldErrors?.passwordConfirm}
						class:placeholder:text-red-500={!!form?.fieldErrors
							?.passwordConfirm}
						placeholder="********"
						aria-invalid={!!form?.fieldErrors?.passwordConfirm}
						aria-errormessage={form?.fieldErrors?.passwordConfirm?.at(0)}
					/>
					{#if form?.fieldErrors?.passwordConfirm}
						<p class="text-xs text-red-500 mt-1">
							{form?.fieldErrors?.passwordConfirm.at(0)}
						</p>
					{/if}
				</section>

				<section class="mt-4">
					<label for="termsConditions" class="flex items-center gap-2 mt-3">
						<input
							type="checkbox"
							name="termsConditions"
							id="termsConditions"
							class="text-indigo-500"
						/>
						I agree to your terms and conditions
					</label>
					<button
						type="submit"
						class="w-full mt-3 bg-indigo-500 hover:bg-indigo-400 transition-colors rounded px-8 py-2 text-white font-medium"
						>Create Account</button
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
				Verify your email!
			</h3>
			<p class="text-center text-slate-400 text-sm">
				Please verify your email via the link sent to your inbox.
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
