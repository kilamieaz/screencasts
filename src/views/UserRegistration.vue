<template>
	<v-container>
		<h1>Register</h1>
		<UserForm :submitForm="registerUser" buttonText="register" :hasName="true" />
	</v-container>
</template>

<script>
import UserForm from "@/components/UserForm";
export default {
	components: {
		UserForm
	},
	methods: {
		async registerUser(registerInfo) {
			let response = await this.$store.dispatch("registerUser", registerInfo);
			if (response.error) {
				alert(response.error);
			} else {
				alert("Welcome to our app, " + response.name);
			}
		}
	}
};
</script>