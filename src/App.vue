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

		<v-snackbar
			v-for="(snackbar, index) in snackbars.filter(s => s.showing)"
			:key="snackbar.text + Math.random()"
			v-model="snackbar.showing"
			:timeout="snackbar.timeout"
			:color="snackbar.color"
			:style="`bottom: ${(index * 60) + 8}px`"
		>
			{{snackbar.text}}
			<v-btn text @click="snackbar.showing = false">Close</v-btn>
		</v-snackbar>
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
		...mapState({
			currentUser: "currentUser",
			snackbars: state => state.snackbars.snackbars
		})
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
