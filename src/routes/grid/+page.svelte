<script lang="ts">
	import { createFlip } from '$lib/flip'

	// @ts-ignore
	$effect(async () => {
		const grid = createFlip('.box', { duration: 1000, stagger: 100 })
		layout = 2
		await grid.flip({ delay: 600 })
		layout = 3
		await grid.flip()
		layout = 4
		await grid.flip()
		layout = 5
		await grid.flip()
		layout = 6
		await grid.flip()
		layout = 7
		await grid.flip()
	})

	let layout = $state(1)
</script>

<div class="grid" data-layout={layout}>
	<div class="box">
		<div class="child"></div>
	</div>

	<div class="box">
		<div class="child"></div>
	</div>

	<div class="box">
		<div class="child"></div>
	</div>

	<div class="box">
		<div class="child"></div>
	</div>
</div>

<style>
	.grid {
		width: 600px;
		height: 600px;
		display: grid;
		place-content: center;
		grid-template-columns: repeat(3, 1fr);
		grid-template-rows: repeat(3, 1fr);
		gap: 1rem;

		&[data-layout='1'] {
			grid-template-areas:
				'a a a'
				'a a a'
				'b c d';
		}

		&[data-layout='2'] {
			grid-template-areas:
				'a a b'
				'a a c'
				'a a d';
		}

		&[data-layout='3'] {
			grid-template-areas:
				'a b b'
				'a c c'
				'a d d';
		}

		&[data-layout='4'] {
			grid-template-areas:
				'b b b'
				'a c d'
				'a c d';
		}

		&[data-layout='5'] {
			grid-template-areas:
				'd c b'
				'a a a'
				'a a a';
		}

		&[data-layout='6'] {
			grid-template-areas:
				'b a a'
				'c a a'
				'd a a';
		}

		&[data-layout='7'] {
			grid-template-areas:
				'a a a'
				'a a a'
				'b c d';
		}

		:nth-child(1) {
			grid-area: a;
			background-color: oklch(72% 0.2 20);
		}

		:nth-child(2) {
			grid-area: b;
			background-color: oklch(72% 0.2 200);
		}

		:nth-child(3) {
			grid-area: c;
			background-color: oklch(72% 0.2 230);
		}

		:nth-child(4) {
			grid-area: d;
			background-color: oklch(72% 0.2 320);
		}

		.box {
			display: grid;
			place-content: center;
			border-radius: 16px;

			& .child {
				width: 100px;
				height: 100px;
				display: grid;
				place-content: center;
				font-family: 'Monaspace Neon';
				font-size: 2rem;
				background-color: #fff;
				border-radius: 16px;
			}
		}
	}
</style>
