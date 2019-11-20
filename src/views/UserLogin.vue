<template>
	<v-container>
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
			if (response.error) {
				alert(response.error);
			} else {
				alert("Thank you for signing in, " + response.name);
			}
		}
	}
};
</script>