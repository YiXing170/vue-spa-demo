import Vue from 'vue'
import Router from 'vue-router'
import goods from '../components/goods.vue'
import ratings from '../components/ratings.vue'
import seller from '../components/seller.vue'

Vue.use(Router)

var router = new Router({
    linkActiveClass:'active',
    routes: [
        {
            path: '/goods',
            component: goods
        },
        {
            path: '/ratings',
            component: ratings
        },
        {
            path: '/seller',
            component: seller
        },
        {
            path:'/',
            redirect:'/goods'
        }
    ]
})
export default router
