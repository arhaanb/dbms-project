<template>
	<main>
		<h6>{{ res?.name }}</h6>
		<h6>Rs. {{ res?.price }}</h6>

		<form @submit.prevent="add(res?.name, res?.product_id)">
			<label for="quantity"></label>
			<input
				id="quantity"
				type="number"
				min="1"
				:max="res?.quantity || null"
				placeholder="Choose quantity"
				v-model="quantity"
			/>
			<button type="submit">Add to cart</button>
		</form>

		{{ user }}
		{{ res }}
	</main>
</template>

<script>
import axios from 'axios'
const route = useRoute()
import { addtocart } from '../../func'
import { getStorage } from '../../local'
import { toast } from 'vue3-toastify'

export default {
	data() {
		return {
			r: route,
			res: null,
			quantity: 1,
			user: JSON.parse(getStorage('user')).user
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
	},
	methods: {
		add(name, p_id) {
			toast(`${name} added to cart!`, {
				theme: 'auto',
				type: 'default',
				position: 'top-center'
			})
			addtocart(this.user.customer_id, this.quantity, p_id)
		}
	}
}
</script>
