<template>
	<v-container>
		<h1>Video List</h1>
		<v-btn text to="/video/add">Add Video</v-btn>

		<div class="flex-table">
			<div>Name</div>
			<div>Description</div>
			<div>Actions</div>
		</div>
		<div class="flex-table" v-for="video in videos" :key="video.id">
			<div>{{video.name}}</div>
			<div>{{video.description}}</div>
			<div class="actions">
				<router-link :to="{ name: 'video-watch', params: {id:video.id }}">Show</router-link>
				<span>Edit</span>
				<v-btn @click="deleteVideo(video)">Delete</v-btn>
			</div>
		</div>
	</v-container>
</template>

<script>
import { mapState } from "vuex";
export default {
	computed: {
		...mapState(["videos"])
	},
	filters: {
		abbreviate(text) {
			if (text) {
				text = text.replace("<p>", "");
				return text.slice(0, 50);
			}
		}
	},
	methods: {
		deleteVideo(video) {
			let response = confirm(`Are you sure you want to delete ${video.name}`);
			if (response) {
				this.$store.dispatch("deleteVideo", video);
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
			padding: 15px;
		}
	}
}
</style>