<template>
	<main class="container">
		<br /><br /><br />
		<div class="row">
			<div class="six columns">
				<img :src="res?.img" alt="" />
				<h1 class="zero">{{ res?.name }}</h1>
				<h5>{{ res?.description }}</h5>
				<h6>Rs. {{ res?.price }}/piece</h6>
			</div>

			<div class="six columns">
				<br /><br /><br />
				<form @submit.prevent="add(res?.name, res?.product_id)">
					<label for="quantity">Quantity</label>
					<input
						id="quantity"
						type="number"
						min="1"
						placeholder="Choose quantity"
						v-model="quantity"
					/>
					<!-- :max="res?.quantity || null" -->
					<button type="submit">Add to Cart</button>
				</form>
			</div>
		</div>
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
