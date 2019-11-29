import Vue from "vue";
import Vuex from "vuex";
import Api from "@/services/api";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        videos: [],
        tags: [],
        playedVideos: [],
        users: [],
        currentUser: {},
        token: [],
    },
    mutations: {
        SET_VIDEOS(state, videos) {
            state.videos = videos;
        },
        SET_TAGS(state, tags) {
            state.tags = tags;
        },
        SET_USERS(state, users) {
            state.users = users;
        },
        SET_PLAYED_VIDEOS(state, playedVideos) {
            state.playedVideos = playedVideos;
            window.localStorage.setItem('playedVideos', JSON.stringify([]));
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
        },
        LOGOUT_USER(state) {
            state.currentUser = {};
            state.token = [];
            window.localStorage.currentUser = JSON.stringify({});
            window.localStorage.accessToken = JSON.stringify([]);
        },
        SET_CURRENT_USER(state, user) {
            state.currentUser = user;
            window.localStorage.setItem('currentUser', JSON.stringify(user));
        },
        SET_ACCESS_TOKEN(state, token) {
            state.token = token;
            window.localStorage.setItem('accessToken', JSON.stringify(token));
        }
    },
    actions: {
        async init() {
            window.localStorage.setItem('playedVideos', JSON.stringify([]));
            window.localStorage.setItem('currentUser', JSON.stringify({}));
            window.localStorage.setItem('accessToken', JSON.stringify([]));
        },
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
        async loadCurrentUser({
            commit
        }) {
            let currentUser = JSON.parse(window.localStorage.currentUser);
            let accessToken = JSON.parse(window.localStorage.accessToken);
            commit('SET_CURRENT_USER', currentUser);
            commit('SET_ACCESS_TOKEN', accessToken);
        },
        async loadUsers({
            commit
        }) {
            await Api().get('/users').then(response => commit('SET_USERS', response.data.data));
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
        },
        logoutUser({
            commit
        }) {
            commit('LOGOUT_USER')
        },
        async loginUser({
            commit
        }, loginInfo) {
            // let response = await Api().post('/login', loginInfo)
            //     .then(commit('SET_CURRENT_USER', response.data.data))
            //     .catch({
            //         error: "Username/password combination was incorrect. Please try agani"
            //     })
            try {
                let response = await Api().post('/login', loginInfo)
                commit('SET_CURRENT_USER', response.data.user)
                commit('SET_ACCESS_TOKEN', `${response.data.token_type} ${response.data.access_token}`)
                return response.data.user
            } catch {
                return {
                    error: "Username/password combination was incorrect. Please try again"
                }
            }
        },
        async registerUser({
            commit
        }, registerInfo) {
            try {
                let response = await Api().post('/register', registerInfo)
                let user = response.data.data
                commit('SET_CURRENT_USER', user)
                return user
            } catch {
                return {
                    error: "There was an error. Please try again."
                }
            }
        }

    },
    modules: {},
    getters: {
        getTag: state => id => {
            return state.tags.find(tag => tag.id == id)
        }
    }
});