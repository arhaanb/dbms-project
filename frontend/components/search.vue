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
