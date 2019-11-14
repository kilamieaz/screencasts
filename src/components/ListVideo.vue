<template>
	<div v-if="video">
		<v-card width="340px" hover class="ma-2" :to="{ name: 'video-watch' , params: {id: video.id} }">
			<v-img :src="video.thumbnail" alt />
			<v-card-title>{{ video.name }}</v-card-title>
			<v-card-text>
				<div class="green--text" v-if="isPlayed">
					<v-row>
						<v-col cols="1">
							<v-icon class="green--text" small>fas fa-check</v-icon>
						</v-col>
						<v-col cols="11">Played</v-col>
					</v-row>
				</div>
			</v-card-text>
			<v-card-actions v-if="video.tags">
				<span v-for="tag in video.tags" :key="tag.id">
					<v-btn
						color="green lighten-2"
						class="mr-2"
						small
						@mousedown.stop
						:to="{ name: 'tag', params: { id: tag.id }}"
					>{{ tag.name }}</v-btn>
				</span>
			</v-card-actions>
		</v-card>
	</div>
</template>


<script>
export default {
	computed: {
		isPlayed() {
			return this.$store.state.playedVideos.includes(this.video.id);
		}
	},
	props: ["video"]
};
</script>

<style scoped lang="scss">
</style>