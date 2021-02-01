
import Vue from 'vue'
import Router from 'vue-router'
import Upload from '../pages/Upload'
import Setting from '../pages/Setting'
import Info from '../pages/Info'
// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: require('@/layouts/Main.vue').default,
      children: [
        {
          path: 'upload',
          name: 'Upload',
          component: Upload,
          meta: {
            keepAlive: false,
            title: '切换1'
          }
        },
        {
          path: 'setting',
          name: 'Setting',
          component: Setting,
          meta: {
            keepAlive: true,
            title: '切换2'
          }
        },
        {
          path: 'info',
          name: 'Info',
          component: Info
        }
      ]
    }
  ]
})
