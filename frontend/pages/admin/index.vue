<template>
	<main>
		<h1>admin</h1>

		<nuxt-link to="/admin/customers">View all customers</nuxt-link>
		<br />
		<nuxt-link to="/admin/orders">View all orders</nuxt-link>
	</main>
</template>

<script>
import './styles.css'
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
