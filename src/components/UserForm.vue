<template>
	<v-form v-model="valid">
		<v-text-field
			v-model="userInfo.name"
			label="Name"
			type="name"
			:rules="[required('name')]"
			v-if="hasName"
		/>
		<v-text-field
			v-model="userInfo.email"
			label="Email"
			type="email"
			:rules="[required('email'),emailFormat()]"
		/>
		<v-text-field
			v-model="userInfo.password"
			label="Password"
			:type="showPassword ? 'text': 'password'"
			:append-icon="showPassword ? 'fas fa-eye' : 'fas fa-eye-slash'"
			@click:append="showPassword = !showPassword"
			:rules="[required('password'), minLength('password', 8)]"
		/>
		<v-btn @click="submitForm(userInfo)" :disabled="!valid">{{ buttonText }}</v-btn>
	</v-form>
</template>

<script>
import validations from "@/utils/validations";

export default {
	data() {
		return {
			valid: false,
			showPassword: false,
			userInfo: {
				email: "",
				password: ""
			},
			...validations
		};
	},
	props: ["submitForm", "buttonText", "hasName"]
};
</script>