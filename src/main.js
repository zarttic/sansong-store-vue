/*
 * 入口文件
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import request from "@/utils/request";


Vue.use(ElementUI);

// 全局函数及变量
import Global from './Global';

Vue.use(Global);
Vue.prototype.request = request

// Vue.prototype.$echarts = echarts
// 全局拦截器,在进入需要用户权限的页面前校验是否已经登录
router.beforeResolve((to, from, next) => {
    const loginUser = store.getters.getAccount;
    // 判断路由是否设置相应校验用户权限
    if (to.meta.requireAuth) {
        if (loginUser === "") {
            // 没有登录，显示登录组件
            store.dispatch("setShowLogin", true);
            if (from.name == null) {
                //此时，是在页面没有加载，直接在地址栏输入链接，进入需要登录验证的页面
                next("/");
                return;
            }
            // 终止导航
            next(false);
            return;
        }
    }
    next();
});
// 添加请求拦截器
request.interceptors.request.use(config => {
  // 在发送请求之前做些什么
  //判断是否存在token，如果存在将每个页面header都添加token
    if (localStorage.getItem("token")) {
        config.headers.common['Authorization'] = localStorage.getItem("token")
    }

    return config;
}, error => {
// 对请求错误做些什么
    console.log("添加请求拦截器的错误")
    return Promise.reject(error);
});
// 相对时间过滤器,把时间戳转换成时间
// 格式: 2020-02-25 21:43:23
Vue.filter('dateFormat', (dataStr) => {
    var time = new Date(dataStr);

    function timeAdd0(str) {
        if (str < 10) {
            str = '0' + str;
        }
        return str;
    }

    var y = time.getFullYear();
    var m = time.getMonth() + 1;
    var d = time.getDate();
    var h = time.getHours();
    var mm = time.getMinutes();
    var s = time.getSeconds();
    return y + '-' + timeAdd0(m) + '-' + timeAdd0(d) + ' ' + timeAdd0(h) + ':' + timeAdd0(mm) + ':' + timeAdd0(s);
});

//全局组件
import MyMenu from './components/MyMenu';

Vue.component(MyMenu.name, MyMenu);
import MyList from './components/MyList';

Vue.component(MyList.name, MyList);
import MyLogin from './components/MyLogin';

Vue.component(MyLogin.name, MyLogin);
import MyRegister from './components/MyRegister';

Vue.component(MyRegister.name, MyRegister);

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
