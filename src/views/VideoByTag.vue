<template>
	<div v-if="tag">
		<div class="display-3 ma-4 d-flex justify-center">Video with tag "{{ tag.name }}"</div>
		<div class="d-flex flex-wrap">
			<div v-for="video in tag.videos" :key="video.id">
				<ListVideo :video="video"></ListVideo>
			</div>
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