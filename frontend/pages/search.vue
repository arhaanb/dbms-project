<template>
	<main>
		<h1>search</h1>

		{{ results ? results : null }}
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
