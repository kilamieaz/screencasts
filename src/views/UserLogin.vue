<template>
	<v-container>
		<h1>Login</h1>
		<UserForm :submitForm="loginUser" buttonText="Login"></UserForm>
	</v-container>
</template>

<script>
import UserForm from "@/components/UserForm";
export default {
	components: {
		UserForm
	},

	methods: {
		async loginUser(loginInfo) {
			let response = await this.$store.dispatch("loginUser", loginInfo);
			if (response.name) {
				alert("Thank you for signing in, " + response.name);
			} else {
				alert(response.error);
			}
		}
	}
};
</script>