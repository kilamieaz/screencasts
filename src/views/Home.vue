<template>
	<div class="home">
		<h1>Videos</h1>
		<div class="video-container">
			<div v-for="video in videos" :key="video.id">
				<ListVideo :video="video"></ListVideo>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from "vuex";
import ListVideo from "@/components/ListVideo";

export default {
	name: "home",
	components: {
		ListVideo
	},
	// computed is an object containing methods that ret urn data
	computed: {
		//map to state this.$store.state.videos;
		...mapState(["videos"])
		// videos() {
		// 	return this.$store.state.videos;
		// }
	}
};
</script>

<style scoped lang="scss">
</style>