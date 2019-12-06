<template>
	<div v-if="video">
		<div class="display-1 pt-3">{{ video.name }}</div>
		<div v-html="video.description"></div>
		<v-combobox
			:items="tags"
			item-text="name"
			v-model="videoTags"
			multiple
			chips
			deletable-chips
			hide-selected
			return-object
		></v-combobox>
	</div>
</template>

<script>
import { mapState } from "vuex";
import _ from "lodash";

export default {
	computed: {
		...mapState({
			videos: state => state.videos.videos,
			tags: state => state.tags.tags
		}),
		video() {
			return this.videos.find(v => v.id == this.$route.params.id);
		},
		videoTags: {
			get() {
				return this.video.tags;
			},
			async set(newTags) {
				// allows the user to enter tag that do not exist and create the new tag
				let createTag = newTags.find(t => typeof t === "string");

				if (createTag) {
					let createdTag = await this.$store.dispatch("tags/create", {
						name: createTag
					});
					this.$store.dispatch("tags/connectToVideo", {
						tag: createdTag,
						video: this.video
					});
				} else {
					let addedTags = _.differenceBy(newTags, this.videoTags, "id");
					let removeTags = _.differenceBy(this.videoTags, newTags, "id");
					if (addedTags.length > 0) {
						this.$store.dispatch("tags/connectToVideo", {
							tag: addedTags[0],
							video: this.video
						});
					}
					if (removeTags.length > 0) {
						this.$store.dispatch("tags/disconnectFromVideo", {
							tag: removeTags[0],
							video: this.video
						});
					}
				}
			}
		}
	}
};
</script>