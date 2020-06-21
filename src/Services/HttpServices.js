import axios from 'axios'
import { Notification } from '../utils/swal'



axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.common['Content-Type'] = 'application/json';
// axios.defaults.headers.common['access_token_cookie'] = Cookie.get('token')
axios.interceptors.response.use(null, error => {
    const expectedError =
        error.response &&
        error.response.status >= 400 &&
        error.response.status < 500;

    if (!expectedError) {
        Notification.fire({
            icon: 'error',
            title: 'خطا در خواندن پایگاه داده'
        })
    }
    return Promise.reject(error)
})

export default {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete,
}