<script lang="ts">
	import { createFlip } from '$lib/flip'

	// @ts-ignore
	$effect(async () => {
		const circles = createFlip('circle', { duration: 1000, stagger: 100 })
		layout = 2
		await circles.flip({ delay: 600 })
		layout = 1
		await circles.flip({ stagger: 0 })
	})

	let layout = $state(1)
</script>

<svg width="600" height="600">
	{#if layout === 1}
		{#each { length: 9 } as _, i}
			{@const fill = i === 4 ? 'yellow' : 'aqua'}
			<circle cx="50%" cy="50%" r="60" {fill} />
		{/each}
	{/if}

	{#if layout === 2}
		<g transform="translate(170, 170)">
			{#each { length: 3 } as _, i}
				{#each { length: 3 } as _, j}
					{@const fill = i === 1 && j === 1 ? 'yellow' : 'aqua'}
					<circle cx={130 * i} cy={130 * j} r="60" {fill} />
				{/each}
			{/each}
		</g>
	{/if}
</svg>
