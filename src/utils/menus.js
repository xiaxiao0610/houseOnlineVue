import {getRequest} from "../api/request";

export const initMenu = (router,store) => {
    if (store.state.routes.length > 0) {
        return;
    }
    getRequest("/system/menu").then(data => {
        if (data) {
            let fmtRoutes = formatRoutes(data.data);
            console.log(fmtRoutes)
            store.commit('initRoutes', fmtRoutes);
            console.log(store.state.routes)
            localStorage.setItem('r',JSON.stringify(data.data));
        }
    })
}




export const formatRoutes = (routes) => {
    let fmRoutes = [];

    routes.forEach(router => {
        let {
            path,
            // component,
            name,
            meta,
            iconCls,
            icon,
            label,
            children,

        } = router;
        if (children && children instanceof Array) {
            children = formatRoutes(children);
        }
        let fmRouter = {
            path: path,
            name: name,
            iconCls: iconCls,
            meta: meta,
            children: children,
            label:label,

            // component(resolve) {
            //     if (component.startsWith("Home")) {
            //         require(['../views/' + component + '.vue'], resolve);
            //     } else if (component.startsWith("Emp")) {
            //         require(['../views/emp/' + component + '.vue'], resolve);
            //     } else if (component.startsWith("Per")) {
            //         require(['../views/per/' + component + '.vue'], resolve);
            //     } else if (component.startsWith("Sal")) {
            //         require(['../views/sal/' + component + '.vue'], resolve);
            //     } else if (component.startsWith("Sta")) {
            //         require(['../views/sta/' + component + '.vue'], resolve);
            //     } else if (component.startsWith("Sys")) {
            //         require(['../views/sys/' + component + '.vue'], resolve);
            //     }
            // }
        }
        fmRoutes.push(fmRouter);
    })
    return fmRoutes;
}
