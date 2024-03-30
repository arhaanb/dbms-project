<template>
	<main class="container">
		<br /><br /><br />
		<div v-if="res" class="row">
			<div class="six columns">
				<h6 class="zero strong">Address</h6>
				<h6 class="">{{ res[0]?.address }}</h6>

				<h6 class="zero strong">Delivery Agent</h6>
				<h6 class="">{{ res[0]?.daname }}</h6>

				<h6 class="zero strong">Shipping</h6>
				<h6 class="">{{ res[0]?.metadata }}</h6>

				<h6 class="zero strong">Status</h6>
				<h6 class="cap">{{ res[0]?.status }}</h6>

				<h6 class="zero strong">Products</h6>
				<h6 class="zero" v-for="r in res" :key="r.product_id">
					{{ r?.quantity }} {{ r?.product_name }} &mdash; Rs.
					{{ r?.total_price }}
				</h6>
			</div>

			<div class="six columns">
				<br /><br /><br />
				<form @submit.prevent="updatestatus()" class="zero">
					<label for="">Set order status</label>
					<input
						placeholder="Enter order status"
						type="text"
						v-model="statustext"
					/>

					<button type="submit">Update status &rarr;</button>
				</form>
			</div>
		</div>
	</main>
</template>

<script>
import axios from 'axios'
const route = useRoute()
import { addtocart } from '../../func'
import { toast } from 'vue3-toastify'
import { getStorage } from '~/local.js'

export default {
	data() {
		return {
			r: route,
			res: null,
			quantity: 1,
			user: JSON.parse(getStorage('user')).user,
			statustext: null
		}
	},
	mounted() {
		this.getthisshit()
	},
	methods: {
		add(name, p_id) {
			toast(`${name} added to cart!`, {
				theme: 'auto',
				type: 'default',
				position: 'top-center'
			})
			addtocart(this.user.customer_id, this.quantity, p_id)
		},
		getthisshit() {
			axios
				.get(
					`http://localhost:8000/admin/getorder?o=${this.$route?.params?.id}`
				)
				.then((response) => {
					this.res = response.data
				})
				.catch((error) => {
					console.error('Error fetching data:', error)
				})
		},
		updatestatus() {
			axios
				.post(
					`http://localhost:8000/admin/updatestatus?o=${this.$route?.params?.id}`,
					{ status: this.statustext }
				)
				.then((response) => {
					this.getthisshit()
					this.statustext = null
				})
				.catch((error) => {
					console.error('Error fetching data:', error)
				})
		}
	},
	created() {
		if (getStorage('user') && JSON.parse(getStorage('user'))?.type == 'admin') {
		} else {
			navigateTo('/')
		}
	}
}
</script>

<style lang="scss" scoped>
.cap {
	text-transform: capitalize;
}
</style>
