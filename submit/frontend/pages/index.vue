<template>
	<main class="container">
		<br />
		<Search />
		<br />

		<section>
			<div class="grid">
				<div v-for="p in res" :key="p" class="card">
					<nuxt-link :to="`/product/${p.product_id}`">
						<img :src="p.img" :alt="p.name" />
						<h5 class="zero">{{ p.name }}</h5>
						<p>{{ p.description }}</p>
					</nuxt-link>

					<button @click="add(p.name, p.product_id)">Add to Cart</button>
				</div>
			</div>
		</section>
	</main>
</template>

<script>
import axios from 'axios'
import { getStorage } from '../local'
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

<style lang="scss">
.grid {
	display: grid;
	grid-gap: 3em;
	grid-template-columns: repeat(3, 1fr);
	margin-bottom: 5em;
}

h1 {
	font-weight: 700;
}

.card {
	background-color: #fafafa;
	border: 1px solid #eaeaea;
	padding: 1em;
	border-radius: 0.5em;
	a {
		text-decoration: none;
		color: #222;
		h5 {
			font-weight: 500;
		}
	}
	p {
		height: 3em; /* Adjust the height as needed for two lines of text */
		overflow: hidden;
		display: -webkit-box;
		-webkit-line-clamp: 2; /* number of lines to show */
		line-clamp: 2;
		-webkit-box-orient: vertical;
	}
	img {
		object-fit: cover;
		aspect-ratio: 1.5;
		border-radius: 0.25em;
	}
}
</style>
