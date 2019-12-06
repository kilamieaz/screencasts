import Api from "@/services/api";
import Vue from 'vue';

export default {
    namespaced: true,
    state: {
        users: [],
        currentUser: {},
        token: [],
    },
    mutations: {
        SET_USERS(state, users) {
            state.users = users;
        },
        SET_PLAYED_VIDEOS(state, playedVideos) {
            // vue not update getters and computed property when the array is change
            // state.currentUser.playedVideos = playedVideos;
            Vue.set(state.currentUser, 'playedVideos', playedVideos);
        },
        MARK_VIDEO_PLAYED(state, videoId) {
            let playedVideos = state.currentUser.playedVideos.concat(videoId)
            state.currentUser.playedVideos = playedVideos;
        },

        LOGOUT_USER(state) {
            state.currentUser = {};
            state.token = [];
            window.localStorage.removeItem('currentUser');
            window.localStorage.removeItem('accessToken');
        },
        SET_CURRENT_USER(state, user) {
            state.currentUser = user;
            window.localStorage.setItem('currentUser', JSON.stringify(user));
        },
        SET_ACCESS_TOKEN(state, token) {
            state.token = token;
            window.localStorage.setItem('accessToken', JSON.stringify(token));
        },
    },
    actions: {
        async loadAll({
            commit
        }) {
            await Api().get('/users').then(response => commit('SET_USERS', response.data.data));
        },
        async loadCurrent({
            commit,
            dispatch
        }) {

            let currentUser = window.localStorage.getItem('currentUser');
            let accessToken = window.localStorage.getItem('accessToken');
            commit('SET_CURRENT_USER', currentUser === null ? '' : JSON.parse(currentUser));
            commit('SET_ACCESS_TOKEN', accessToken === null ? '' : JSON.parse(accessToken));
            if (currentUser) {
                dispatch('loadPlayedVideos', JSON.parse(currentUser).id)
            }
        },
        async loadPlayedVideos({
            commit
        }, userId) {
            await Api().get(`/users/${userId}`)
                .then(response => commit('SET_PLAYED_VIDEOS', response.data.data.played_video_ids));
        },

        markVideoPlayed({
            commit,
            state
        }, videoId) {
            let currentUser = state.currentUser
            if (currentUser.name) {
                commit('MARK_VIDEO_PLAYED', videoId);
                Api().post(`/users/${currentUser.id}/playedVideos`, {
                    video_id: videoId
                });
            }
        },

        logout({
            commit
        }) {
            commit('LOGOUT_USER')
        },
        async login({
            commit,
            dispatch
        }, loginInfo) {
            try {
                let response = await Api().post('/login', loginInfo)
                let user = response.data.user;
                commit('SET_CURRENT_USER', user)
                dispatch('loadPlayedVideos', user.id)
                commit('SET_ACCESS_TOKEN', `${response.data.token_type} ${response.data.access_token}`)
                return user
            } catch {
                return {
                    error: "Username/password combination was incorrect. Please try again"
                }
            }
        },
        async register({
            commit,
            dispatch
        }, registerInfo) {
            try {
                let response = await Api().post('/register', registerInfo)
                let user = response.data
                commit('SET_CURRENT_USER', user)
                dispatch('loadPlayedVideos', user.id)
                return user
            } catch {
                return {
                    error: "There was an error. Please try again."
                }
            }
        },
    },
    modules: {},
    getters: {
        playedVideos: state => {
            return state.currentUser.playedVideos || [];
        },
        videoIsPlayed: (state, getters) => videoId => {
            return getters.playedVideos.includes(videoId);
        }
    }
}