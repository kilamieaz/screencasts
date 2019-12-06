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
			if (response.name) {
				this.$store.dispatch("snackbars/setSnackbar", {
					text: `Welcome to our app, ${response.name}`
				});
				this.$router.push("/");
			} else {
				this.$store.dispatch("snackbars/setSnackbar", {
					text: `${response.error}`,
					color: "error"
				});
			}
		}
	}
};
</script>