import { createApp } from 'vue'
import App from './App.vue' 
import CategoryList from './components/CategoryList.vue'
import HomePage from './components/HomePage.vue'
import BlogPage from './components/BlogPage.vue'
import LoginPage from './components/admin/LoginPage.vue'
import DashboardPage from './components/admin/DashboardPage.vue'
import NewBlog from './components/admin/NewBlog.vue'
import { createMemoryHistory, createRouter } from 'vue-router'


const routes = [
    {path: '/', component: HomePage},
    {path: '/category', component: CategoryList},
    {path: '/blog/:categoryId', component: BlogPage, props: true},
    {path: '/admin', component: LoginPage},
    {path: '/manageblog', component: NewBlog},
    {path: '/dashboard', component: DashboardPage}

]
 
//createApp.use(VueQuill)


const router = createRouter({
    history: createMemoryHistory(),
    routes,
  })

createApp(App).use(router).mount('#app')

