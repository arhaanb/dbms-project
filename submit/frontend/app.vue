<template>
	<div>
		<nav class="navbar">
			<nuxt-link to="/">
				<h5 class="zero">Meds</h5>
			</nuxt-link>

			<div class="right">
				<nuxt-link v-if="user?.isAdmin == 1" to="/admin">Admin</nuxt-link>
				<nuxt-link v-if="user" to="/wallet">Wallet</nuxt-link>
				<nuxt-link v-if="user" to="/cart">Cart</nuxt-link>
				<a v-if="user" href="/logout">
					<button>
						{{ user?.username }}
					</button>
				</a>
				<nuxt-link v-else to="/login">
					<button>Login</button>
				</nuxt-link>
			</div>
		</nav>

		<main>
			<NuxtPage />
		</main>
	</div>
</template>

<script>
import { saveStorage, getStorage } from './local.js'

export default {
	data() {
		return {
			user: null
		}
	},
	mounted() {
		if (getStorage('user')) {
			this.user = JSON.parse(getStorage('user'))
			this.user = this.user.user
		}
	}
}
</script>

<style scoped>
.right {
	display: flex;
	justify-content: 'flex-end';
	gap: 2em;
	align-items: center;
}
.navbar {
	display: flex;
	justify-content: space-between;
	align-items: center;
}
</style>
