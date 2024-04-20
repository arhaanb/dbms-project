<template>
	<main class="container">
		<div class="flex">
			<h1>Products</h1>
			<nuxt-link to="/admin/products/add">
				<button>Add a Product</button>
			</nuxt-link>
		</div>

		<table v-if="res">
			<thead>
				<tr>
					<th>ID</th>
					<th>Name</th>
					<th>Supplier</th>
					<th>Price</th>
					<th>Description</th>
					<th>Quantity</th>
					<th>Metadata</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="i in res" :key="i">
					<td>{{ i.product_id }}</td>
					<td>{{ i.name }}</td>
					<td>{{ i.supplier_id }}</td>
					<td>{{ i.price }}</td>
					<td>{{ i.description }}</td>
					<td>{{ i.quantity }}</td>
					<td>{{ i.metadata }}</td>
				</tr>
			</tbody>
		</table>

		<br /><br /><br />
	</main>
</template>

<script>
import axios from 'axios'
import { getStorage } from '~/local.js'

export default {
	data() {
		return {
			res: null
		}
	},
	mounted() {
		axios
			.get('http://localhost:8000/home')
			.then((response) => {
				this.res = response.data
			})
			.catch((error) => {
				console.error('Error fetching data:', error)
			})
	},
	created() {
		if (getStorage('user') && JSON.parse(getStorage('user'))?.type == 'admin') {
		} else {
			navigateTo('/')
		}
	}
}
</script>

<style scoped lang="scss">
.flex {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.center {
	text-align: center;
}

.grid {
	display: grid;
	grid-gap: 3em;
	grid-template-columns: repeat(3, 1fr);
}

table {
	width: 100%;
	border-collapse: collapse;
}
th,
td {
	padding: 8px;
	text-align: left;
	border-bottom: 1px solid #ddd;
}
th {
	background-color: #f2f2f2;
}
</style>
