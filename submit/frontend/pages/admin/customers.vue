<template>
	<main class="container">
		<h1>Customers</h1>

		<table v-if="res">
			<thead>
				<tr>
					<th>ID</th>
					<th>Name</th>
					<th>Address</th>
					<th>Email</th>
					<th>Phone</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="i in res" :key="i">
					<td>{{ i.id }}</td>
					<td>{{ i.name }}</td>
					<td>{{ i.address }}</td>
					<td>{{ i.email }}</td>
					<td>{{ i.phone }}</td>
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
			.get('http://localhost:8000/admin/customers')
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

<style scoped>
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
