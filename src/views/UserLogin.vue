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
				this.$store.dispatch("snackbars/setSnackbar", {
					text: `Thank you for signing in, ${response.name}`
				});
				if (response.id == 1) {
					this.$router.push("/admin/");
				}
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