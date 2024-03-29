<template>
	<h1>login</h1>
	<form @submit.prevent="submitForm()" action="">
		<label for="">Username</label>
		<input required v-model="username" type="text" placeholder="Username" />
		<br />
		<label for="">Password</label>
		<input required v-model="password" placeholder="Password" type="password" />

		<button type="submit">submit</button>

		<h5 style="color: red">{{ error ? error?.error : null }}</h5>
	</form>
</template>

<script>
import axios from 'axios'
import { saveStorage, getStorage } from '../local.js'

export default {
	data() {
		return {
			username: null,
			password: null,
			error: null
		}
	},
	methods: {
		submitForm() {
			axios
				.post('http://localhost:8000/login', {
					u: this.username,
					p: this.password,
					error: ''
				})
				.then((response) => {
					console.log(response.data)
					// const state = useStorage("user", response.data);
					saveStorage('user', response.data)
					window.location.href = '/'
				})
				.catch((error) => {
					console.error('Error fetching data:', error?.response?.data)
					this.error = error?.response?.data
					this.u = ''
					this.p = ''
				})
		}
	},
	created() {
		if (getStorage('user') && JSON.parse(getStorage('user')) != null) {
			navigateTo('/')
		}
	}
}
</script>
