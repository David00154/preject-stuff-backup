<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import AuthErrorText from '$lib/components/AuthErrorText.svelte';
	import Divider from '$lib/components/Divider.svelte';
	import Nprogress from 'nprogress';

	import type { ActionData } from './$types';

	export let form: ActionData;

	let emailRef: HTMLInputElement;
	$: btnDisabled = false;
	$: {
		if (form?.error) {
			emailRef?.focus();
			btnDisabled = false;
		}
	}
</script>

<svelte:head>
	<title>Stread Way</title>
</svelte:head>

<div>
	<h1 class="text-xl">What's your contact email?</h1>
	<Divider />
	<form
		method="post"
		use:enhance={() => {
			Nprogress.start();
			form = null;
			btnDisabled = true;
			return async ({ result }) => {
				await applyAction(result);
			};
		}}
	>
		<div class="w-full flex flex-row border-transparent border-2 bg-[#eee]">
			<input
				value={form?.email ?? ''}
				name="email"
				type="text"
				bind:this={emailRef}
				class="w-full pl-3 py-[10px] rounded-lg text-base focus:ring-2 focus:ring-black border-none outline-none font-normal placeholder:text-gray-600/90 placeholder:text-base placeholder:font-normal bg-inherit"
				placeholder="Enter your email"
			/>
		</div>
		{#if form?.error && form?.error?.email}
			<AuthErrorText text={form?.error?.email._errors[0]} />
		{/if}
		{#if form?.error && form?.error.message}
			<AuthErrorText text={form?.error?.message} />
		{/if}
		<Divider height="16px" />
		<button
			disabled={btnDisabled}
			type="submit"
			style="transition: .5s;"
			class="w-full flex items-center justify-center text-white bg-black py-[14px] rounded-lg hover:bg-[rgb(51,_51,_51)] disabled:hover:cursor-not-allowed disabled:hover:text-white disabled:hover:bg-[rgb(51,_51,_51)] disabled:text-gray-400 disabled:bg-white"
			>Continue</button
		>
	</form>
	<Divider height="9px" />
	<p class="text-gray-600/90 text-[12px] leading-5 pr-4">
		By proceeding, you consent to get calls, WhatsApp or SMS messages, including by automated means,
		from Uber and its affiliates to the number provided.
	</p>
</div>
