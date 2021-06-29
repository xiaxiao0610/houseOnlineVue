import { createStore } from 'vuex'

export default createStore({
  state: {
    routes:[],
    sessions:{},
    hrs:[],
    currentSession: null,
    currentHr: JSON.parse(window.sessionStorage.getItem("user")),
    filterKey: '',
    stomp: null,
    isDot: {}

  },
  mutations: {
    INIT_CURRENTPEOPLE(state,people){
      state.currentPeople=people;
    },
    initRoutes(state,data){
      state.routes=data;
    }
  },
  actions: {
  },
  modules: {
  }
})
