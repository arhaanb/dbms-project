<template>
	<main class="container">
		<div class="row">
			<div class="flex-center">
				<div class="six columns border">
					<h1 class="zero">Login</h1>
					<form class="zero" @submit.prevent="submitForm()" action="">
						<label for="">Username</label>
						<input
							required
							v-model="username"
							type="text"
							placeholder="Username"
						/>
						<br />
						<label for="">Password</label>
						<input
							required
							v-model="password"
							placeholder="Password"
							type="password"
						/>

						<button class="zero" type="submit">submit</button>

						<h5 style="color: red" v-if="error">{{ error ? error?.error : null }}</h5>
					</form>
				</div>
			</div>
		</div>
	</main>
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


<style lang="scss" scoped>
.border {
	background-color: #fafafa;
	border: 1px solid #eaeaea;
	padding: 2em;
	border-radius: 0.5em;
	margin-top: 8em;
}

h1 {
	font-size: 2.3em;
	margin-bottom: 0.2em;
}
button:focus, button:active {
	color: white;
}

h5 {
	margin: 0;
	margin-top: 0.5em;
	font-size: 1.2em;
	font-weight: 500;
}
</style>