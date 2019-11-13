<template>
	<div>
		<router-link :to="{ name: 'video-watch' , params: {id: video.id} }">
			<div class="video-box">
				<img :src="video.thumbnail" alt />
				<div>
					<h3>{{ video.name }}</h3>
					<div v-html="video.description"></div>
					<span v-for="tag in video.tags" :key="tag.id">
						<router-link :to="{ name: 'tag', params: { id: tag.id }}">
							<button class="tag-button">{{ tag.name }}</button>
						</router-link>
					</span>
				</div>
			</div>
		</router-link>
	</div>
</template>


<script>
export default {
	props: ["video"]
};
</script>

<style scoped lang="scss">
.video-box {
	border: 1px solid;
	border-radius: 10px;
	margin: 10px;
	padding: 10px;
	text-align: left;
	display: flex;
	justify-content: flex-start;

	img {
		width: 200px;
		padding: 10px;
	}
}
</style>