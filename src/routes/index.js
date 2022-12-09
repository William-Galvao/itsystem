import { createRouter, createWebHistory } from "vue-router";
import { getCurrentUser } from "../firebase";

const routes = [
    { path: "/login", name: "login", component: () => import("@/views/Login.vue") },
    {
        path: "/", name: "home", component: () => import("@/views/Home.vue"),
        meta: {
            requiresAuth: true
        }
    },
    { path: "/cadastrarcliente/:id?", name: "cadastrarcliente", component: () => import("@/views/CadastrarCliente.vue"),
    meta: {
        requiresAuth: true
    } },
    { path: "/cadastrarfuncionario", name: "cadastrarfuncionario", component: () => import("@/views/CadastrarFuncionario.vue"),
    meta: {
        requiresAuth: true
    } },

];

const router = createRouter({
    routes,
    history: createWebHistory(),
});

router.beforeEach(async (to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    if (requiresAuth && !await getCurrentUser()) {
        next('login');
    } else {
        next();
    }
});

export default router;