<script lang="ts">
	import type { ActionData } from './$types';

	export let form: ActionData;
</script>

<main>
	<div class="max-w-sm mx-auto my-10">
		<h3 class="text-center font-extrabold font-serif text-3xl">
			Welcome Back!
		</h3>
		<p class="text-center text-slate-400 text-sm">
			Do not have an account yet? <a
				href="/signup"
				class="text-indigo-400 hover:underline">Create account</a
			>
		</p>

		<form method="POST" class="rounded-md shadow-md px-6 py-8 mt-6">
			<section>
				<label for="identity" class="block font-medium">Username or Email</label
				>
				<input
					type="text"
					name="identity"
					id="identity"
					class="block w-full bg-slate-50 mt-1 px-4 py-2 rounded focus:outline-slate-300"
					class:focus:outline-red-300={!!form?.fieldErrors?.identity}
					class:placeholder:text-red-500={!!form?.fieldErrors?.identity}
					placeholder="johndoe"
					value={form?.identity ?? ''}
					aria-invalid={!!form?.fieldErrors?.identity}
					aria-errormessage={form?.fieldErrors?.identity?.at(0)}
				/>
				{#if form?.fieldErrors?.identity}
					<p class="text-xs text-red-500 mt-1">
						{form?.fieldErrors?.identity.at(0)}
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
				<a href="/forgot-password" class="text-sm text-indigo-400 underline"
					>Forgotten your password?</a
				>
				<button
					type="submit"
					class="w-full mt-3 bg-indigo-500 hover:bg-indigo-400 transition-colors rounded px-8 py-2 text-white font-medium"
					>Log In</button
				>
			</section>
		</form>
	</div>
</main>
