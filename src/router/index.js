import VueRouter from "vue-router";
import Home from "../components/Home.vue";
import Game from "../components/Game.vue";
import Vue from "vue";

Vue.use(VueRouter)

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/game",
        name: "Game",
        component: Game,
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;