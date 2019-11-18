<template>
	<v-container v-if="video">
		<v-form v-model="valid">
			<v-text-field
				v-model="video.name"
				label="Name"
				counter="50"
				:rules="[required('name'), minLength('name', 5), maxLength('name', 50)]"
			/>
			<v-textarea
				v-model="video.description"
				label="Description"
				counter="20"
				:rules="[required('description'), minLength('name', 20), maxLength('name', 20)]"
			/>
			<v-text-field
				v-model="video.thumbnail"
				label="Thumbnail URL"
				:rules="[required('thumbnail URL')]"
			/>
			<v-text-field
				v-model="video.video_url"
				label="Video URL"
				hint="Use Amazon s3 or similiar instead of Youtube and vimeo"
				:rules="[required('video URL')]"
			/>
			<v-btn @click="saveVideo(video)" :disabled="!valid">Save Video</v-btn>
		</v-form>
	</v-container>
</template>

<script>
import { mapState } from "vuex";
export default {
	data() {
		return {
			valid: false,
			required(propertyType) {
				return v => (v && v.length > 0) || `You must input a ${propertyType}`;
			},
			minLength(propertyType, minLength) {
				return v =>
					(v && v.length >= 5) ||
					`${propertyType} must be at least ${minLength} characters`;
			},
			maxLength(propertyType, maxLength) {
				return v =>
					(v && v.length <= 20) ||
					`${propertyType} must be less than ${maxLength} characters`;
			}
		};
	},
	computed: {
		...mapState(["videos"]),
		video() {
			return this.videos.find(v => v.id == this.$route.params.id);
		}
	},
	methods: {
		async saveVideo(video) {
			await this.$store.dispatch("editVideo", video);
			this.$router.push({ name: "admin-video-list" });
		}
	}
};
</script>