<template>
	<main>
		<h6>{{ res?.name }}</h6>
		<h6>Rs. {{ res?.price }}</h6>

		<form @submit.prevent>
			<label for="quantity"></label>
			<input
				id="quantity"
				type="number"
				min="1"
				:max="res?.quantity || null"
				placeholder="Choose quantity"
			/>
      <button type="submit">Add to cart</button>
		</form>

		{{ res }}
	</main>
</template>

<script>
import axios from 'axios'
const route = useRoute()

export default {
	data() {
		return {
			r: route,
			res: null
		}
	},
	mounted() {
		console.log(this.r.params.id)
		axios
			.get(`http://localhost:8000/product?p=${this.$route?.params?.id}`)
			.then((response) => {
				this.res = response.data
			})
			.catch((error) => {
				console.error('Error fetching data:', error)
			})
	}
}
</script>
