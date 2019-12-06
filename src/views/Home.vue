<template>
	<div class="home">
		<div class="display-4 ma-4 d-flex justify-center">Videos</div>
		<div class="d-flex flex-wrap">
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
		...mapState({
			videos: state => state.videos.videos,
			tags: state => state.tags.tags
		})
	}
};
</script>

<style scoped lang="scss">
</style>