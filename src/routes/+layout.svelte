<script lang="ts">
  let { children } = $props()
</script>

<svelte:head>
	<title>FLIP</title>
</svelte:head>

{@render children()}

<style>
	:global(*) {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	:global(body) {
		height: 100svh;
		display: grid;
		place-content: center;
		background-color: oklch(23.66% 0.02 271.79);
	}
</style>
