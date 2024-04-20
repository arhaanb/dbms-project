<template>
	<main class="container">
		<br /><br />
		<h1>Admin panel</h1>

		<ul>
			<li>
				<nuxt-link to="/admin/customers">View all customers</nuxt-link>
			</li>
			<li>
				<nuxt-link to="/admin/orders">View all orders</nuxt-link>
			</li>
			<li>
				<nuxt-link to="/admin/products">Manage products</nuxt-link>
			</li>
		</ul>
	</main>
</template>

<script>
import { getStorage } from '~/local.js'

export default {
	created() {
		if (getStorage('user') && JSON.parse(getStorage('user'))?.type == 'admin') {
		} else {
			navigateTo('/')
		}
	}
}
</script>
