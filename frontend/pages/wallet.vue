<template>
	<main>
		<h1>wallet</h1>

		<section>
			<div class="row">
				<div class="six columns">
					<div class="box">
						<h3>Rs. {{ results?.amt }}</h3>
						<h5>Current balance</h5>
					</div>
				</div>

				<div class="six columns">
					<h5>Add to wallet</h5>
					<form @submit.prevent="addtowallet()">
						<input
							v-model="amount"
							type="number"
							min="1"
							placeholder="Enter an amount"
						/>
						<br />
						<button type="submit">Add to wallet &rarr;</button>
					</form>
				</div>
			</div>
		</section>
	</main>
</template>

<script>
import axios from 'axios'
import { saveStorage, getStorage } from '../local.js'

export default {
	data() {
		return {
			results: null,
			user: null,
			amount: null
		}
	},
	methods: {
		addtowallet() {
			axios
				.get(
					`http://localhost:8000/addtowallet?amt=${this.amount}&id=${
						JSON.parse(getStorage('user')).user.customer_id
					}`
				)
				.then((res) => {
					this.results = res.data
					this.amount = null
				})
				.catch((err) => {
					console.log(err)
				})
		}
	},
	mounted() {
		if (getStorage('user')) {
			this.user = JSON.parse(getStorage('user'))
			axios
				.get(
					`http://localhost:8000/wallet?id=${
						JSON.parse(getStorage('user')).user.customer_id
					}`
				)
				.then((res) => {
					this.results = res.data
				})
				.catch((err) => {
					console.log(err)
				})
		}
	}
}
</script>
