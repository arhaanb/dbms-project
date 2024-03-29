<template>
	<main class="container">
		<h1>Cart</h1>

		{{ res }}
	</main>
</template>

<script>
import axios from 'axios'
import { useStorage } from '@vueuse/core'

export default {
	data() {
		return {
			res: null,
			user: useStorage('user')
		}
	},
	mounted() {
		axios
			.get('http://localhost:8000/cart?c=17')
			.then((response) => {
				this.res = response.data
			})
			.catch((error) => {
				console.error('Error fetching data:', error)
			})
	}
}
</script>

<style scoped>
.grid {
	display: grid;
	grid-gap: 3em;
	grid-template-columns: repeat(3, 1fr);
}
</style>
