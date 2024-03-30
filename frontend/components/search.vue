<template>
	<main>
		<form @submit.prevent="search()">
			<input v-model="s" required type="text" placeholder="Search" />
			<button type="submit">Search</button>
		</form>
	</main>
</template>

<script>
export default {
	methods: {
		search() {
      // console.log('jsdgjk')
			// window.location.href = `/search?q=${this.s}`
			navigateTo({
			  path: "/search",
			  query: {
			    q: this.s,
			  },
			});
		}
	},
	data() {
		return {
			s: ''
		}
	}
}
</script>

<style lang="scss" scoped>
form {
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 1em;
	margin-top: 1em;
	input, button {
		margin: 0;
	}
}
</style>