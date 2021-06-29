import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from "../views/Login";
import About from "../views/About";

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/home',
    name: 'Home',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Home'),
    children:[
      {
        path: '/peoMessage',
        name: 'PeopleMessage',
        component: ()=>import('../views/ Personal information/PeoMess')
      },
      {
        path: '/role/basic',
        name: 'RoleBasic',
        component:()=>import('../views/Role/RoleBasic')
      },
      {
        path: '/role/adv',
        name: 'RoleAdv',
        component:()=>import('../views/Role/RoleAdv')
      },
      {
        path: '/user/basic',
        name: 'UserBasic',
        component:()=>import('../views/User/UserBasic')
      },
      {
        path: '/customer/all',
        name: 'Customer',
        component:()=>import('../views/Customer/index')
      },
      {
        path: '/customer/examine',
        name: 'Examine',
        component:()=>import('../views/Customer/examine')
      }
    ]
  },

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
