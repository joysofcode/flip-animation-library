<script lang="ts">
	import { createFlip } from '$lib/flip'

	// @ts-ignore
	$effect(async () => {
		const box = createFlip('.box')
		layout = 2
		box.flip({ delay: 600 })
	})

	let layout = $state(1)
</script>

{#if layout === 1}
	<div class="flex start">
		<div class="box small"></div>
	</div>
{/if}

{#if layout === 2}
	<div class="flex end">
		<div class="box large"></div>
	</div>
{/if}

<style>
	.flex {
		width: 800px;
		height: 200px;
		display: flex;
		align-items: center;

		&.start {
			justify-content: start;
		}

		&.end {
			justify-content: end;
		}
	}

	.box {
		background: aqua;
		border-radius: 20px;

		&.small {
			width: 100px;
			height: 100px;
		}

		&.large {
			width: 200px;
			height: 200px;
		}
	}
</style>
