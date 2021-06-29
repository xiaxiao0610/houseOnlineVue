import {getRequest} from "../api/request";
// import {useStore} from "vuex";
export const initMenu = (router,store) => {
    if (store.state.routes.length > 0) {
        return;
    }
    getRequest("/system/config/menu").then(data => {
        console.log(data.data)
        if (data) {
            let fmtRoutes = formatRoutes(data.data);
            // router.addRoutes(fmtRoutes);

            // for (let i=0;i<fmtRoutes.length;i++){
            //    console.log(fmtRoutes[i])
            //     router.addRoute(fmtRoutes[i])
            // }
            console.log(fmtRoutes)
            store.commit('initRoutes', fmtRoutes);
            console.log(store.state.routes)
            localStorage.setItem('r',JSON.stringify(data.data));

            // fmtRoutes.forEach( d=>{
            //     console.log('foreach'+d)
            //     d.children.forEach(c=>{
            //         console.log(c)
            //     })
            //
            // })


            // store.dispatch('connect');
        }
    })
}




export const formatRoutes = (routes) => {
    let fmRoutes = [];

    routes.forEach(router => {
        let {
            path,
            component,
            name,
            meta,
            iconcls,
            label,
            children
        } = router;
        if (children && children instanceof Array) {
            children = formatRoutes(children);
        }
        let fmRouter = {
            path: path,
            name: name,
            iconcls: iconcls,
            meta: meta,
            children: children,
            label:label,
            component(resolve) {
                if (component.startsWith("Home")) {
                    require(['../views/' + component + '.vue'], resolve);
                } else if (component.startsWith("Emp")) {
                    require(['../views/emp/' + component + '.vue'], resolve);
                } else if (component.startsWith("Per")) {
                    require(['../views/per/' + component + '.vue'], resolve);
                } else if (component.startsWith("Sal")) {
                    require(['../views/sal/' + component + '.vue'], resolve);
                } else if (component.startsWith("Sta")) {
                    require(['../views/sta/' + component + '.vue'], resolve);
                } else if (component.startsWith("Sys")) {
                    require(['../views/sys/' + component + '.vue'], resolve);
                }
            }
        }
        fmRoutes.push(fmRouter);
    })
    return fmRoutes;
}
