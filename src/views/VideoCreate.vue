<template>
	<v-container>
		<h1>Video Create Page</h1>
		<v-row>
			<v-col md="3" cols="12">
				<v-text-field v-model="video.name" label="Name" />
				<v-textarea v-model="video.description" label="Description" />
				<v-text-field v-model="video.thumbnail" label="Thumbnail URL" />
				<v-text-field
					v-model="video.video_url"
					label="Video URL"
					hint="Use Amazon s3 or similiar instead of Youtube and vimeo"
				/>
				<v-btn @click="createVideo">Add Video</v-btn>
			</v-col>
			<v-col md="9" cols="12">
				<ListVideo :video="video" />
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import ListVideo from "@/components/ListVideo";
export default {
	components: {
		ListVideo
	},
	data() {
		return {
			video: {}
		};
	},
	methods: {
		async createVideo() {
			let video = await this.$store.dispatch("createVideo", this.video);
			this.$router.push({ name: "video-watch", params: { id: video.id } });
		}
	}
};
</script>