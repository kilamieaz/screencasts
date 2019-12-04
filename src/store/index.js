import Vue from "vue";
import Vuex from "vuex";
import Api from "@/services/api";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        videos: [],
        tags: [],
        users: [],
        currentUser: {},
        token: [],
        snackbars: []
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
            // vue not update getters and computed property when the array is change
            // state.currentUser.playedVideos = playedVideos;
            Vue.set(state.currentUser, 'playedVideos', playedVideos);
        },
        MARK_VIDEO_PLAYED(state, videoId) {
            let playedVideos = state.currentUser.playedVideos.concat(videoId)
            state.currentUser.playedVideos = playedVideos;
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
        SET_SNACKBAR(state, snackbar) {
            state.snackbars = state.snackbars.concat(snackbar);
        },
        CONNECT_TAG_TO_VIDEO(state, {
            tag,
            video
        }) {
            let videoFromState = state.videos.find(v => v.id == video.id);
            let tagFromState = state.tags.find(t => t.id == tag.id);

            Vue.set(videoFromState, 'tags', videoFromState.tags.concat(tag));
            Vue.set(tagFromState, 'videos', tagFromState.videos.concat(video));
            // videoFromState.tags = videoFromState.tags.concat(tag);
            // tagFromState.videos = tagFromState.videos.concat(video);
        },
        DISCONNECT_TAG_FROM_VIDEO(state, {
            tag,
            video
        }) {
            let videoFromState = state.videos.find(v => v.id == video.id);
            let tagFromState = state.tags.find(t => t.id == tag.id);

            Vue.set(videoFromState, 'tags', videoFromState.tags.filter(t => t.id != tag.id));
            Vue.set(tagFromState, 'videos', tagFromState.videos.filter(v => v.id != video.id));
        },
        CREATE_TAG(state, {
            tag
        }) {
            let tags = state.tags.concat(tag);
            state.tags = tags;
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
        },
        async loadCurrentUser({
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
        async loadUsers({
            commit
        }) {
            await Api().get('/users').then(response => commit('SET_USERS', response.data.data));
        },
        markPlayed({
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
            return await Api().put(`/videos/${video.id}`, video)
                .then(response => {
                    commit('EDIT_VIDEO', response.data.data);
                    return response.data.data;
                });
        },
        logoutUser({
            commit
        }) {
            commit('LOGOUT_USER')
        },
        async loginUser({
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
        async registerUser({
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
        setSnackbar({
            commit
        }, snackbar) {
            snackbar.showing = true;
            snackbar.color = snackbar.color || 'success';
            commit('SET_SNACKBAR', snackbar);
        },
        async connectTagToVideo({
            commit
        }, {
            tag,
            video
        }) {
            await Api().post(`/videos/${video.id}/tags`, {
                tag_id: tag.id
            });
            commit('CONNECT_TAG_TO_VIDEO', {
                tag,
                video
            });
        },
        async disconnectTagFromVideo({
            commit
        }, {
            tag,
            video
        }) {
            await Api().delete(`/videos/${video.id}/tags/${tag.id}`);
            commit('DISCONNECT_TAG_FROM_VIDEO', {
                tag,
                video
            });
        },
        async createTag({
            commit
        }, {
            name
        }) {
            // response tag with videos
            let response = await Api().post(`/tags`, {
                name
            });
            let createdTag = response.data.data;
            commit('CREATE_TAG', {
                tag: createdTag
            })
            return createdTag
        }
    },
    modules: {},
    getters: {
        getTag: state => id => {
            return state.tags.find(tag => tag.id == id);
        },
        playedVideos: state => {
            return state.currentUser.playedVideos || [];
        },
        isPlayed: (state, getters) => videoId => {
            return getters.playedVideos.includes(videoId);
        }
    }
});