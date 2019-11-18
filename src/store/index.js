import Vue from "vue";
import Vuex from "vuex";
import Api from "@/services/api";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        videos: [],
        tags: [],
        playedVideos: [],
    },
    mutations: {
        SET_VIDEOS(state, videos) {
            state.videos = videos;
        },
        SET_TAGS(state, tags) {
            state.tags = tags;
        },
        SET_PLAYED_VIDEOS(state, playedVideos) {
            state.playedVideos = playedVideos;
        },
        MARK_VIDEO_PLAYED(state, videoId) {
            let playedVideos = state.playedVideos.concat(videoId)
            state.playedVideos = playedVideos;
            window.localStorage.playedVideos = JSON.stringify(playedVideos);
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
        }
    },
    actions: {
        async loadData({
            commit
        }) {
            // let videosResponse = await Api().get('/videos');
            // let tagsResponse = await Api().get('/tags');
            // let videos = videosResponse.data.data;
            // let tags = tagsResponse.data.data;
            // commit('SET_VIDEOS', videos);
            // commit('SET_TAGS', tags);

            await Api().get('/videos').then(response => commit('SET_VIDEOS', response.data.data));
            await Api().get('/tags').then(response => commit('SET_TAGS', response.data.data));
            let playedVideos = JSON.parse(window.localStorage.playedVideos);
            commit('SET_PLAYED_VIDEOS', playedVideos);
        },
        markPlayed({
            commit
        }, videoId) {
            commit('MARK_VIDEO_PLAYED', videoId);
        },
        async createVideo({
            commit
        }, video) {
            let response = await Api().post('/videos', video);
            let savedVideo = response.data.data;
            commit('CREATE_VIDEO', savedVideo);
            return savedVideo;
        },
        async deleteVideo({
            commit
        }, video) {
            //delete video on server
            await Api().delete(`/videos/${video.id}`);
            //delete video in state
            commit('DELETE_VIDEO', video.id)
        },
        async editVideo({
            commit
        }, video) {
            await Api().put(`/videos/${video.id}`, video)
                .then(response => {
                    commit('EDIT_VIDEO', response.data.data)
                    return response.data.data;
                });
        }
    },
    modules: {},
    getters: {
        getTag: state => id => {
            return state.tags.find(tag => tag.id == id)
        }
    }
});