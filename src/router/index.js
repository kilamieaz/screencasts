import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import VideoWatch from "../views/VideoWatch.vue";
import VideoCreate from "../views/VideoCreate.vue";
import VideoByTag from "../views/VideoByTag.vue";
import AdminVideoList from "../views/AdminVideoList.vue";

Vue.use(VueRouter);

const routes = [{
        path: "/",
        name: "home",
        component: Home
    },
    {
        path: "/about",
        name: "about",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import( /* webpackChunkName: "about" */ "../views/About.vue")
    },
    {
        path: '/admin/videos',
        name: "admin-video-list",
        component: AdminVideoList,
    },
    {
        path: '/video/create',
        name: "video-create",
        component: VideoCreate
    },
    {
        path: "/video/:id",
        name: "video-watch",
        component: VideoWatch,
        params: true
    },
    {
        path: "/tag/:id",
        name: "tag",
        component: VideoByTag,
        params: true
    }
];

const router = new VueRouter({
    routes
});

export default router;