import axios from 'axios'
import router from './router'
import { Loading,Message } from 'element-ui'

// 开始加载动画
let loading;

function startLoading() {
    loading = Loading.service({
        lock: true, //是否锁定
        text: '拼命加载中...',
        // 加载中需要显示的文字
        background: 'rgba(0,0,0,.7)',
        // 背景颜色
    });
}

// 结束加载动画
function endLoading() {
    loading.close();
}

const request = axios.create({
    baseURL:'http://127.0.0.1:8000/'
    // baseURL:'/'
})

// 请求拦截
request.interceptors.request.use(config => {
    if(localStorage.token) {
        config.headers.Authorization = 'Bearer ' + localStorage.token
    }
    startLoading();
    // 请求时的加载动画
    return config
}, error => {
    return Promise.reject(error)
})

// 响应拦截
request.interceptors.response.use(res => {
    endLoading();
    // 结束加载动画
    return res
}, err => {
    if (err.response.data.message) {
        Message({
            message: err.response.data.message,
            type: 'error',
            duration: 5 * 1000
        })
    }
    if (err.response.status === 401) {
        router.push('/login')
    }
    // endLoading()
    // 如果错误也结束动画
    return Promise.reject(err)
})

export default request