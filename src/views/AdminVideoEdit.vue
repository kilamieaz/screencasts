<template>
	<v-container v-if="video">
		<VideoForm :video="video" :saveVideo="saveVideo" buttonText="Save Video"></VideoForm>
	</v-container>
</template>

<script>
import VideoForm from "@/components/VideoForm";
import { mapState } from "vuex";
export default {
	components: {
		VideoForm
	},
	computed: {
		...mapState(["videos"]),
		video() {
			return this.videos.find(v => v.id == this.$route.params.id);
		}
	},
	methods: {
		async saveVideo() {
			await this.$store.dispatch("editVideo", this.video);
			this.$router.push({ name: "admin-video-list" });
		}
	}
};
</script>