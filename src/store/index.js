import Vue from "vue";
import Vuex from "vuex";
import Api from "@/services/api";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        videos: [],
        tags: [],
    },
    mutations: {
        SET_VIDEOS(state, videos) {
            state.videos = videos;
        },
        SET_TAGS(state, tags) {
            state.tags = tags;
        }
    },
    actions: {
        async loadData({
            commit
        }) {
            let videosResponse = await Api().get('/videos');
            let tagsResponse = await Api().get('/tags');
            let videos = videosResponse.data.data;
            let tags = tagsResponse.data.data;
            commit('SET_VIDEOS', videos);
            commit('SET_TAGS', tags);
        }
    },
    modules: {},
    getters: {
        getTag: state => id => {
            return state.tags.find(tag => tag.id == id)
        }
    }
});