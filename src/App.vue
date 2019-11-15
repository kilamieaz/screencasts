<template>
	<v-app>
		<v-app-bar app color="green" dark>
			<v-toolbar-title class="headline text-uppercase">
				<v-btn text to="/">Screencast</v-btn>
				<v-btn text to="/video/create">Add Video</v-btn>
			</v-toolbar-title>

			<v-spacer></v-spacer>

			<v-btn text>
				<span class="mr-2">Login</span>
			</v-btn>
		</v-app-bar>

		<v-content>
			<router-view />
		</v-content>
	</v-app>
</template>

<script>
export default {
	name: "App",

	components: {},

	// mounted is a life hook executed after the intance gets mounted
	mounted() {
		this.$store.dispatch("loadData");
	},

	data: () => ({
		//
	})
};
</script>
