<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import AuthErrorText from '$lib/components/AuthErrorText.svelte';
	import Divider from '$lib/components/Divider.svelte';
	import nProgress from 'nprogress';
	import type { ActionData, PageServerData } from './$types';
	import { onMount } from 'svelte';
	import PinInput from '$lib/components/PinInput.svelte';

	let otpRef: HTMLInputElement;

	export let form: ActionData;

	export let data: PageServerData;

	onMount(() => {
		otpRef?.focus();
	});

	$: btnDisabled = false;
	$: {
		if (form?.error) {
			otpRef?.focus();
			btnDisabled = false;
		}
	}
</script>

<svelte:head>
	<title>Verify | Stread Way</title>
</svelte:head>

<div>
	<h1 class="lg:text-2xl text-xl leading-8 lg:leading-[30px]">
		<span>
			{data.success}
			<span>
				<span>
					{data.email}
				</span>
			</span>
		</span>
	</h1>
	<Divider height="28px" />
	<form
		method="post"
		use:enhance={() => {
			nProgress.start();
			form = null;
			btnDisabled = true;
			return async ({ result }) => {
				await applyAction(result);
			};
		}}
	>
		<div class="pb-3">
			<PinInput />
			<!-- <div class="w-full flex flex-row border-transparent border-2 bg-[#eee]">
				<input
					value={form?.login_code ?? ''}
					inputmode="numeric"
					pattern="\d*"
					name="login_code"
					type="text"
					aria-required="false"
					bind:this={otpRef}
					class="w-full pl-3 py-[10px] rounded-lg text-base focus:ring-2 focus:ring-black border-none
					outline-none font-normal placeholder:text-gray-500 placeholder:text-base placeholder:font-normal
					bg-inherit"
					placeholder="Otp"
				/>
			</div> -->
			{#if form?.error && form?.error?.login_code}
				<AuthErrorText text={form?.error?.login_code._errors[0]} />
			{/if}
			{#if form?.error && form?.error?.message}
				<AuthErrorText text={form?.error?.message} />
			{/if}
		</div>
		<p class="text-gray-500 text-[13px] leading-4">
			Tip: Make sure to check your inbox and spam folders
		</p>
		<Divider height="50px" />
		<div class="w-full flex" />
	</form>
</div>
