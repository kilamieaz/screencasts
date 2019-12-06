<template>
	<div>
		<div v-for="user in users" :key="user.id">
			{{user.name}}
			<v-btn small @click="loginUser(user)">login</v-btn>
		</div>
	</div>
</template>

<script>
import { mapState } from "vuex";
export default {
	computed: {
		...mapState({ users: state => state.users.users })
	},
	mounted() {
		this.$store.dispatch("users/loadAll");
	},
	methods: {
		loginUser(user) {
			this.$store.dispatch("users/login", user);
		}
	}
};
</script>