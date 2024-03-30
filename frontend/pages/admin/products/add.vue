<template>
	<main class="container">
		<h1>Products</h1>

		<form v-if="res" @submit.prevent="addproduct()">
			<label for="">Name</label>
			<input placeholder="Enter name" type="text" v-model="f.name" />

			<!-- 
			<select style="width: 100%" required id="supplier" v-model="f.supplier">
				<option value="0" selected disabled>Choose a supplier</option>
				<option v-for="s in res" :key="s.supplier_id" :value="supplier_id">
					{{ s.name }}
				</option>
			</select> -->

			<label for="supplier">Supplier</label>
			<VueSelect
				v-model="f.supplier"
				:options="s"
				placeholder="Select an option"
			/>
			<br />

			<label for="">Description</label>
			<input
				placeholder="Enter description"
				type="text"
				v-model="f.description"
			/>

			<label for="">Image Link</label>
			<input placeholder="Enter image link" type="text" v-model="f.image" />

			<label for="">Price</label>
			<input placeholder="Enter price" type="number" v-model="f.price" />

			<label for="">Quantity</label>
			<input placeholder="Enter quantity" type="number" v-model="f.quantity" />

			<label for="">Metadata</label>
			<input placeholder="Enter metadata" type="text" v-model="f.metadata" />

			<button type="submit">Add product</button>
		</form>
	</main>
</template>

<script>
import axios from 'axios'
import { useStorage } from '@vueuse/core'
import { toast } from 'vue3-toastify'
import VueSelect from 'vue3-select-component'
import 'vue3-select-component/dist/style.css'

export default {
	components: {
		VueSelect
	},
	data() {
		return {
			res: null,
			user: useStorage('user'),
			s: null,
			f: {
				name: null,
				supplier: 0,
				description: null,
				image: null,
				price: null,
				quantity: null,
				metadata: null
			},
      dup: null
		}
	},
	methods: {
		addproduct() {
			axios
				.post('http://localhost:8000/addproduct', this.f)
				.then((response) => {
					this.res = response.data

					toast(`Product added!`, {
						theme: 'auto',
						type: 'default',
						position: 'top-center'
					})
				})
				.catch((error) => {
					console.error('Error fetching data:', error)
				})
		}
	},
	mounted() {
		axios
			.get('http://localhost:8000/suppliers')
			.then((response) => {
				this.res = response.data
				var arr = []
				this.res.forEach((e) => {
					arr.push({ label: e.name, value: e.supplier_id })
				})
				this.s = arr
			})
			.catch((error) => {
				console.error('Error fetching data:', error)
			})
	}
}
</script>

<style scoped>
.flex {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.grid {
	display: grid;
	grid-gap: 3em;
	grid-template-columns: repeat(3, 1fr);
}
</style>
