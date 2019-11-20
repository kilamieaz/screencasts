<template>
	<v-container>
		<v-form>
			<v-text-field v-model="loginInfo.email" label="Email" type="email" />
			<v-text-field
				v-model="loginInfo.password"
				label="Password"
				:type="showPassword ? 'text': 'password'"
				:append-icon="showPassword ? 'fas fa-eye' : 'fas fa-eye-slash'"
				@click:append="showPassword = !showPassword"
			/>
			<v-btn @click="loginUser">Login</v-btn>
		</v-form>
	</v-container>
</template>

<script>
export default {
	data() {
		return {
			showPassword: false,
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
				alert("Thank you for signing in, " + response.name);
			}
		}
	}
};
</script>