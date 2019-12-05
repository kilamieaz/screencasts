<template>
	<div>
		<div class="flex-table">
			<div>Name</div>
			<div># videos</div>
			<div></div>
		</div>
		<div v-for="tag in tags" :key="tag.id" class="flex-table">
			<div>
				<div v-if="tagEditingId == tag.id">
					<v-text-field
						v-model="tag.name"
						:id="`tag-edit-${tag.id}`"
						@blur="updateTag(tag)"
						@keydown.enter="updateTag(tag)"
					></v-text-field>
				</div>
				<div v-else @click="setToEditing(tag)">{{ tag.name }}</div>
			</div>
			<router-link :to="{ name: 'tag', params: { id: tag.id }}">
				<div>{{ tag.videos.length }}</div>
			</router-link>
			<div class="actions">
				<v-btn x-small @click="setToEditing(tag)">Edit</v-btn>
				<v-btn x-small @click="deleteTag(tag)">Delete</v-btn>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from "vuex";
export default {
	data() {
		return {
			tagEditingId: ""
		};
	},
	computed: {
		...mapState(["tags"])
	},
	methods: {
		setToEditing(tag) {
			this.tagEditingId = tag.id;
			setTimeout(() => {
				document.getElementById(`tag-edit-${tag.id}`).focus();
			}, 1);
		},
		updateTag(tag) {
			this.tagEditingId = "";
			this.$store.dispatch("updateTag", { tag });
		},
		deleteTag(tag) {
			let confirmed = confirm(
				`Are you sure you want to delete tag ${tag.name}? It is connected to ${tag.videos.length} videos.`
			);
			if (confirmed) {
				this.$store.dispatch("deleteTag", { tag });
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.flex-table {
	display: grid;
	grid-template-columns: repeat(auto-fill, 33%);
	padding: 10px;
	border-bottom: 1px black solid;

	&:nth-of-type(2n) {
		background-color: #dedede;
	}

	.actions {
		* {
			margin-right: 15px;
		}
	}
}
</style>