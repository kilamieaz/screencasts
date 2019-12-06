import Vue from "vue";
import Vuex from "vuex";
import Api from "@/services/api";
import snackbarsModule from "./snackbars"
import tagsModules from "./tags"
import videosModules from "./videos"
import usersModules from "./users"

Vue.use(Vuex);

export default new Vuex.Store({
    state: {},
    modules: {
        snackbars: snackbarsModule,
        tags: tagsModules,
        videos: videosModules,
        users: usersModules
    },
    mutations: {},
    actions: {},
    getters: {}
});