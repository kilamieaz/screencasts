<template>
	<v-app>
		<v-app-bar app color="green" dark>
			<v-toolbar-title class="headline text-uppercase">
				<v-btn text to="/">Screencast</v-btn>
				<v-btn text to="/admin/videos">Admin</v-btn>
			</v-toolbar-title>

			<v-spacer></v-spacer>
			<div v-if="currentUser.name">
				{{ currentUser.name }}
				<v-btn text>
					<span class="mr-2" @click="logoutUser">Logout</span>
				</v-btn>
			</div>
			<div v-else>
				<v-btn text to="/login">Login</v-btn>
				<v-btn text to="/registration">Register</v-btn>
			</div>
		</v-app-bar>

		<v-content>
			<router-view />
		</v-content>
	</v-app>
</template>

<script>
import { mapState } from "vuex";
export default {
	name: "App",

	components: {},

	// mounted is a life hook executed after the intance gets mounted
	mounted() {
		this.$store.dispatch("loadData");
		this.$store.dispatch("loadCurrentUser");
	},

	computed: {
		...mapState(["currentUser"])
	},

	data: () => ({
		//
	}),
	methods: {
		logoutUser() {
			this.$store.dispatch("logoutUser");
		}
	}
};
</script>
