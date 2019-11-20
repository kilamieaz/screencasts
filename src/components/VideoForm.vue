<template>
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
			counter="true"
			:rules="[required('description'), minLength('description', 20)]"
		/>
		<v-text-field
			v-model="video.video_url"
			label="Video URL"
			hint="Use Amazon s3 or similiar instead of Youtube and vimeo"
			:rules="[required('video URL')]"
		/>
		<v-text-field
			v-model="video.thumbnail"
			label="Thumbnail URL"
			:rules="[required('thumbnail URL')]"
		/>
		<v-btn @click="saveVideo" :disabled="!valid">{{buttonText}}</v-btn>
	</v-form>
</template>

<script>
import validations from "@/utils/validations";
export default {
	data() {
		return {
			valid: false,
			...validations
		};
	},
	props: ["video", "saveVideo", "buttonText"]
};
</script>