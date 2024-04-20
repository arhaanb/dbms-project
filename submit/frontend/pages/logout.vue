<template>
	<h5>Logging out...</h5>
</template>

<script>
import { clearStorage } from '../local.js'

export default {
	created() {
		clearStorage('user')
		navigateTo('/login')
	}
}
</script>
