<template>
	<div>
		<div class="display-1 pt-3">{{ video.name }}</div>
		<div v-html="video.description"></div>
		<v-autocomplete
			:items="tags"
			item-text="name"
			v-model="videoTags"
			multiple
			chips
			deletable-chips
			hide-selected
			return-object
		></v-autocomplete>
	</div>
</template>

<script>
import { mapState } from "vuex";

export default {
	computed: {
		...mapState(["videos", "tags"]),
		video() {
			return this.videos.find(v => v.id == this.$route.params.id);
		},
		videoTags() {
			return this.video.tags;
		}
	}
};
</script>