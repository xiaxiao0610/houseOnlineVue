import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import naive from 'naive-ui'
// 通用字体
import 'vfonts/Lato.css'
// 等宽字体
import 'vfonts/FiraCode.css'
import {initMenu} from "./utils/menus";

router.beforeEach((to, from, next) => {
    if (to.path == '/') {
        next();
    } else {
        if (window.sessionStorage.getItem("user")) {
            initMenu(router, store);
            next();
        }
        else {
            next('/?redirect=' + to.path);
        }
    }
})

createApp(App).use(store).use(router).use(naive).mount('#app')
