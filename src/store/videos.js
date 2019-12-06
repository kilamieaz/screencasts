import Api from "@/services/api";

export default {
    namespaced: true,
    state: {
        videos: [],
    },
    mutations: {
        SET_VIDEOS(state, videos) {
            state.videos = videos;
        },
        CREATE_VIDEO(state, video) {
            let videos = state.videos.concat(video);
            state.videos = videos;
        },
        DELETE_VIDEO(state, videoId) {
            let videos = state.videos.filter(v => v.id != videoId);
            state.videos = videos;
        },
        EDIT_VIDEO(state, video) {
            state.videos.forEach(v => {
                if (v.id == video.id) {
                    v = video;
                }
            })
        },
    },
    actions: {
        async loadAll({
            commit
        }) {
            await Api().get('/videos').then(response => commit('SET_VIDEOS', response.data.data));
        },
        async create({
            commit
        }, video) {
            let response = await Api().post('/videos', video);
            let savedVideo = response.data.data;
            commit('CREATE_VIDEO', savedVideo);
            return savedVideo;
        },
        async delete({
            commit
        }, video) {
            //delete video on server
            await Api().delete(`/videos/${video.id}`);
            //delete video in state
            commit('DELETE_VIDEO', video.id)
        },
        async edit({
            commit
        }, video) {
            return await Api().put(`/videos/${video.id}`, video)
                .then(response => {
                    commit('EDIT_VIDEO', response.data.data);
                    return response.data.data;
                });
        },
    },
    modules: {},
    getters: {}
}