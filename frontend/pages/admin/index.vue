<template>
	<main>
		<h1>admin</h1>

		<nuxt-link to="/admin/customers">View all customers</nuxt-link>
		<br />
		<nuxt-link to="/admin/orders">View all orders</nuxt-link>

		<!-- <TabsRoot class="TabsRoot" default-value="tab1">
			<TabsList class="TabsList" aria-label="Manage your account">
				<TabsTrigger class="TabsTrigger" value="tab1">Account</TabsTrigger>
				<TabsTrigger class="TabsTrigger" value="tab2">Password</TabsTrigger>
			</TabsList>
			<TabsContent class="TabsContent" value="tab1">
				<h1>1</h1>
			</TabsContent>
			<TabsContent class="TabsContent" value="tab2">
				<h1>2</h1>
			</TabsContent>
		</TabsRoot> -->
	</main>
</template>

<script>
import {
	TabsContent,
	TabsIndicator,
	TabsList,
	TabsRoot,
	TabsTrigger
} from 'radix-vue'
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
