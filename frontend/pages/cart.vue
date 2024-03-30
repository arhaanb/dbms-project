<template>
	<main class="container">
		<h1>Cart</h1>

		<div v-if="res && res.cart.length > 0">
			<div class="box" v-for="i in res?.cart" :key="i.product_id">
				<div class="info">
					<div>
						<h4 class="zero">{{ i.name }}</h4>
						<p class="zero">
							{{ i.metadata }}
						</p>
					</div>
					<h5 class="zero">Rs. {{ i.total_price }}</h5>
				</div>
				<div class="flex">
					<h6 class="zero">Quantity: {{ i.total_quantity }}</h6>
					<h6 @click="remove(i.product_id)" class="zero remove">Remove</h6>
				</div>
			</div>
		</div>

		<div v-else>
			<h5 class="zero">Your cart is empty</h5>
			<nuxt-link to="/">
				<button>Shop</button>
			</nuxt-link>
		</div>

		<h5 style="float: right">Total: Rs. {{ total_price }}</h5>
		<div class="u-cf"></div>
		<section v-if="res && res.cart.length > 0" class="order">
			<h1>Order</h1>
			<form @submit.prevent="orderProducts()">
				<label for="address">Address</label>
				<input
					v-model="address"
					placeholder="Enter your address"
					type="text"
					id="address"
					required
				/>

				<br />
				<p class="zero">Choose a shipping option: {{ shipping }}</p>
				<div class="radio">
					<input
						type="radio"
						id="option1"
						value="Standard Shipping"
						v-model="shipping"
					/>
					<label for="option1">Standard Shipping</label><br />
				</div>

				<div class="radio">
					<input
						type="radio"
						id="option2"
						value="Express Shipping"
						v-model="shipping"
					/>
					<label for="option2">Express Shipping</label><br />
				</div>

				<br />

				<button type="submit">Order</button>
				<!-- <div v-if="error">
					{{ error.error }}
				</div> -->
				<br />
				<br />
				<br />
				<br />
			</form>
		</section>
	</main>
</template>

<script>
import axios from 'axios'
import { useStorage } from '@vueuse/core'
import { toast } from 'vue3-toastify'

export default {
	data() {
		return {
			res: null,
			user: useStorage('user'),
			orderres: null,
			total_price: 0,
			error: null,
			address: null,
			shipping: 'Standard Shipping'
		}
	},
	methods: {
		orderProducts() {
			axios
				.post('http://localhost:8000/order', {
					cart: this.res.cart,
					details: {
						customer_id: JSON.parse(this.user).user.customer_id,
						total_price: this.total_price,
						address: this.address,
						shipping: this.shipping
					}
				})
				.then((response) => {
					console.log(response.data)
					this.orderres = response.data
					navigateTo('/success')
				})
				.catch((error) => {
					console.error('Error fetching data:', error?.response?.data)
					this.error = error?.response?.data
					toast(`${this.error.error}`, {
						theme: 'auto',
						type: 'default',
						position: 'top-center'
					})
				})
		},
		remove(id) {
			// Find the index of the product with the given id
			const index = this.res.cart.findIndex(
				(product) => product.product_id === id
			)

			axios
				.get(
					`http://localhost:8000/removefromcart?c_id=${
						JSON.parse(this.user).user.customer_id
					}&p_id=${id}`
				)
				.then((response) => {})
				.catch((error) => {
					console.error('Error fetching data:', error)
				})

			if (index !== -1) {
				this.total_price -= this.res.cart[index].total_price
				this.res.cart.splice(index, 1)
			}
		}
	},
	mounted() {
		axios
			.get(
				`http://localhost:8000/cart?c=${JSON.parse(this.user).user.customer_id}`
			)
			.then((response) => {
				this.res = response.data
				var sum = 0
				response.data?.cart.forEach((i) => {
					sum += parseFloat(i.total_price)
					console.log(i)
				})

				this.total_price = sum
			})
			.catch((error) => {
				console.error('Error fetching data:', error)
			})
	}
}
</script>

<style lang="scss" scoped>
.box {
	background-color: #f2f2f2;
	margin-bottom: 1em;
	border-radius: 0.5em;
	padding: 1em;
	input {
		margin: 0;
	}
	.info {
		margin-bottom: 0.5em;
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
	}
	.flex {
		display: flex;
		justify-content: space-between;
	}
	.remove {
		color: red;
		cursor: pointer;
		&:hover {
			opacity: 0.7;
		}
	}
}

.radio {
	display: flex;
	justify-content: flex-start;
	align-items: center;
	gap: 0.5em;
	input {
		width: auto;
		margin: 0;
		margin-top: -0.4em;
	}
}

.grid {
	display: grid;
	grid-gap: 3em;
	grid-template-columns: repeat(3, 1fr);
}
</style>
