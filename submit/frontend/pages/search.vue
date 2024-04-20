<template>
	<main class="container">
		<h4>Search results for "{{ $route.query.q }}"</h4>

		<div class="grid" v-if="results">
			<nuxt-link
				v-for="r in results"
				:key="r.product_id"
				class="card"
				:to="`/product/${r.product_id}`"
			>
				<img :src="r.img" :alt="r.name" />
				<h5 class="zero">{{ r.name }}</h5>
				<p class="zero">{{ r.description }}</p>
			</nuxt-link>
		</div>
	</main>
</template>

<script>
import axios from 'axios'
export default {
	data() {
		return {
			results: null,
			p: useRoute().query
		}
	},
	created() {
		axios
			.get(`http://localhost:8000/search?q=${this.p?.q}`)
			.then((res) => {
				this.results = res.data
			})
			.catch((err) => {
				console.log(err)
			})
	}
}
</script>

<style lang="scss" scoped>
a {
	color: #222;
	text-decoration: none;
	transition: 0.2s;
	&:hover {
		opacity: 0.6;
	}
	h5 {
		font-weight: 500;
	}
}

h4 {
	font-weight: 700;
	font-size: 3em;
}
</style>
