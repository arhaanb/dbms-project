<template>
	<main class="container">
		<Search />

		{{ user }}

		<h1>Products</h1>

		<section>
			<div class="grid">
				<div v-for="p in res" :key="p" class="card">
					<nuxt-link :to="`/product/${p.product_id}`">
						<img :src="p.img" :alt="p.name" />
						<h5 class="zero">{{ p.name }}</h5>
						<p>{{ p.metadata }}</p>
					</nuxt-link>

					<button @click="add(p.name, p.product_id)">add to cart</button>
				</div>
			</div>
		</section>
	</main>
</template>

<script>
import axios from 'axios'
import {getStorage} from '../local'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import { addtocart } from '../func'

export default {
	data() {
		return {
			res: null,
			user: null
		}
	},
	methods: {
		showt(name) {
			toast(`${name} added to cart!`, {
				theme: 'auto',
				type: 'default',
				position: 'top-center'
			})
		},
		add(name, p_id) {
			// console.log(this.user.customer_id)
			addtocart(this.user.customer_id, 1, p_id)
			this.showt(name)
		}
	},
	mounted() {
		if (getStorage('user')) {
			this.user = JSON.parse(getStorage('user'))
			this.user = this.user.user
		}
		axios
			.get('http://localhost:8000/home')
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
