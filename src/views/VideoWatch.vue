<template>
	<v-container v-if="video">
		<v-row>
			<v-col md="9" cols="12">
				<video-player ref="videoPlayer" :options="playerOptions" @ended="markPlayed"></video-player>
			</v-col>
			<v-col md="3" cols="12">
				<div class="display-1">{{ video.name }}</div>
				<div class="green--text" v-if="isPlayed(video.id)">
					<v-row>
						<v-col cols="1">
							<v-icon class="green--text" small>fas fa-check</v-icon>
						</v-col>
						<v-col cols="11">Played</v-col>
					</v-row>
				</div>
				<div v-else>
					<v-btn x-small @click="markPlayed" v-if="currentUser.name">Mark Played</v-btn>
				</div>
				<div v-html="video.description"></div>
				<span v-for="tag in video.tags" :key="tag.id">
					<v-btn
						color="green lighten-2"
						class="ma-1"
						:to="{ name: 'tag', params: { id: tag.id }}"
					>{{ tag.name }}</v-btn>
				</span>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import "video.js/dist/video-js.css";

import { videoPlayer } from "vue-video-player";
import { mapState, mapGetters } from "vuex";
export default {
	components: {
		videoPlayer
	},
	computed: {
		...mapGetters(["isPlayed"]),
		...mapState(["videos", "currentUser"]),
		video() {
			return this.videos.find(vid => vid.id == this.$route.params.id);
		},

		playerOptions() {
			return {
				// videojs options
				language: "en",
				playbackRates: [0.7, 1.0, 1.5, 2.0, 2, 5, 3.0],
				sources: [
					{
						type: "video/mp4",
						src: this.video.video_url
					}
				],
				poster: this.video.thumbnail,
				fluid: true
			};
		}
	},
	methods: {
		markPlayed() {
			this.$store.dispatch("markPlayed", this.video.id);
		}
	}
};
</script>


<style>
</style>