<template>
	<main class="container">
		<h1>Orders</h1>

		<table v-if="res">
			<thead>
				<tr>
					<th>ID</th>
					<th>Customer</th>
					<th>Address</th>
					<th>Delivery Agent</th>
					<th>Description</th>
					<th>Status</th>
					<th>Delivery</th>
					<th>Details</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="i in res" :key="i">
					<td>{{ i.order_id }}</td>
					<td>{{ i.name }}</td>
					<td>{{ i.address }}</td>
					<td>{{ i.delivery_agent_id }}</td>
					<td>{{ i.delivery_agent_id }}</td>
					<td>{{ i.order_status }}</td>
					<td>{{ i.metadata }}</td>
					<td>
						<nuxt-link :to="`/admin/orders/${i.order_id}`"
							>View &rarr;</nuxt-link
						>
					</td>
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
			.get('http://localhost:8000/admin/orders')
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
