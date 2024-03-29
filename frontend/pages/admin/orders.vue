<template>
	<main class="container">
		<h1>Orders</h1>

		<p v-for="o in res" :key="o.order_id">
			{{ o }}
		</p>
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
			.get('http://localhost:8000/admin/orders')
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
