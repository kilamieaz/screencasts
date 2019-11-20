<template>
	<div>
		<v-form>
			<v-text-field v-model="loginInfo.email" label="Email" type="email" />
			<v-text-field v-model="loginInfo.password" label="Password" type="password" />
			<v-btn @click="loginUser">Login</v-btn>
		</v-form>
	</div>
</template>

<script>
export default {
	data() {
		return {
			loginInfo: {
				email: "",
				password: ""
			}
		};
	},
	methods: {
		async loginUser() {
			let response = await this.$store.dispatch("loginUser", this.loginInfo);
			if (response.error) {
				alert(response.error);
			} else {
				alert("Thank you for signing in, " + user.name);
			}
		}
	}
};
</script>