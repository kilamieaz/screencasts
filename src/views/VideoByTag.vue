<template>
	<div>
		<h1>Video with tag "{{ tag.name }}"</h1>
		<div v-for="video in tag.videos" :key="video.id">
			<ListVideo :video="video"></ListVideo>
		</div>
	</div>
</template>

<script>
import { mapGetters } from "vuex";
import ListVideo from "@/components/ListVideo";

export default {
	components: {
		ListVideo
	},
	computed: {
		...mapGetters(["getTag"]),
		tag() {
			return this.getTag(this.$route.params.id);
		}
	}
};
</script>