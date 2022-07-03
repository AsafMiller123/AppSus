import mailApp from './views/mail-app.cmp.js'
import mailDetails from './views/mail-details.cmp.js'
import mailEdit from './views/mail-edit.cmp.js'



const routes = [
    {
        path: '/mail/edit/:mailId?',
        component: mailEdit,
    },
    {
        path: '/mail/:mailId?',
        component: mailDetails,
    },
    {
        path: '/inbox',
        component: mailApp,
    },
    {
        path: '/sent',
        component: mailApp,
    },
    {
        path: '/starred',
        component: mailApp,
    },
    {
        path: '/trash',
        component: mailApp,
    },
    {
        path: '/draft',
        component: mailApp,
    },
    {
        path: '/',
        redirect: '/inbox',
        component: mailApp,
    },
]



export const router = VueRouter.createRouter({
    routes,
    history: VueRouter.createWebHashHistory()
})