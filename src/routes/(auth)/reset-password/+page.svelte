<script lang="ts">
	import type { ActionData } from './$types';

	// TODO: handle token in loader

	export let form: ActionData;
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
					class:placeholder:text-red-500={!!form?.fieldErrors?.passwordConfirm}
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
