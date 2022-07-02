import { router } from './router.js'
import appHeader from './cmps/app-header.cmp.js'
import userMsg from './cmps/user-msg.cmp.js'
import emailFolderList from './cmps/email-folder-list.cmp.js'

const options = {
    template: `
        <section>
            <app-header />
            <div class="page-body">
                <email-folder-list />
                <router-view />
            </div>
            <app-footer />
        </section>
    `,
    components: {
        appHeader,
        emailFolderList
    }
};


const app = Vue.createApp(options)
app.use(router)
app.mount('#app')

