import Vue from "vue";
import VueRouter from 'vue-router';
import Board from "./Board";
import Login from "./components/guest/pages/auth/Login";
import Register from "./components/guest/pages/auth/Register";
import Landing from "./components/guest/pages/Landing";

Vue.use(VueRouter);

const routes = [
    { path: "/board/:id", name: "board", component: Board },
    { path: "/landing", name: "landing", component: Landing },
    { path: "/login", name: "auth-login", component: Login },
    { path: "/register", name: "auth-register", component: Register }
];

export default new VueRouter({
    routes, mode: "history"
});
