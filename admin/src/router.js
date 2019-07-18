import Vue from 'vue'
import Router from 'vue-router'
import Main from './views/Main.vue'

import Login from './views/Login.vue'

import CategoryEdit from './views/CategoryEdit.vue'
import CategoryList from './views/CategoryList.vue'

import TagEdit from './views/TagEdit.vue'
import TagList from './views/TagList.vue'

import ArticleEdit from './views/ArticleEdit.vue'
import ArticleList from './views/ArticleList.vue'


import BannerEdit from './views/BannerEdit.vue'
import BannerList from './views/BannerList.vue'

import AdminEdit from './views/AdminEdit.vue'
import AdminList from './views/AdminList.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        isPublic: true
      }
    },
    {
      path: '/',
      name: 'main',
      component: Main,
      children: [
        {
          path:'categories/create',
          component: CategoryEdit
        },
        {
          path: 'categories/edit/:id',
          component: CategoryEdit,
          props: true
        },
        {
          path: 'categories/list',
          component: CategoryList
        },

        {
          path:'tags/create',
          component: TagEdit
        },
        {
          path: 'tags/edit/:id',
          component: TagEdit,
          props: true
        },
        {
          path: 'tags/list',
          component: TagList
        },
        
        {
          path: 'articles/create',
          component: ArticleEdit
        },
        {
          path: 'articles/list',
          component: ArticleList
        },
        {
          path: 'articles/edit/:id',
          component: ArticleEdit,
          props: true
        },

        {
          path: 'banners/create',
          component: BannerEdit
        },
        {
          path: 'banners/list',
          component: BannerList
        },
        {
          path: 'banners/edit/:id',
          component: BannerEdit,
          props: true
        },

        {
          path: 'admin_users/create',
          component: AdminEdit
        },
        {
          path: 'admin_users/list',
          component: AdminList
        },
        {
          path: 'admin_users/edit/:id',
          component: AdminEdit,
          props: true
        },
      ]
    },
  ]
})

router.beforeEach((to,from,next)=> {
  if (!to.meta.isPublic && !localStorage.token) {
    return next('/login')
  }
  next()
})

export default router
