import axios from "axios";
const service=axios.create({

});
service.interceptors.request.use(
    config=>{
        return config;
    },
    error => {
        //返回错误信息
        return Promise.resolve(error)
    }
);
service.interceptors.response.use(
    response=>{
        if (response.status===200){
            return response.data;
        }else {
            Promise.reject();
        }
    },
    error => {
        if (error.response.status===504||error.response.data===404){

        }
        return Promise.reject();
    },
    data=>{
        if (data.status&&data.status==200&&data.data.status=='error'){
            return;
        }
        return data;
    },

);
let base='';
export const postRequest = (url, params) => {
    return axios({
        method: 'post',
        url: `${base}${url}`,
        data: params,
        transformRequest: [function (data) {
            let ret = ''
            for (let it in data) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            }
            return ret
        }],
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
}
export const uploadFileRequest = (url, params) => {
    return axios({
        method: 'post',
        url: `${base}${url}`,
        data: params,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
}

export const putRequest = (url, params) => {
    return axios({
        method: 'put',
        url: `${base}${url}`,
        data: params
    })
}
export const deleteRequest = (url) => {
    return axios({
        method: 'delete',
        url: `${base}${url}`
    });
}
export const getRequest = (url) => {
    return axios({
        method: 'get',
        url: `${base}${url}`
    });
}


export default service;
