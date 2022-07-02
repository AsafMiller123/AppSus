import { router } from './../../js/router.js'

export default {
    template: `
        <section class="email-folder-container">
        <router-link to="/mail/edit" class="add-new-mail">+Compose</router-link>
        <ul class="list-email-folder">
            <li class="list-email-folder-li" v-bind:class="{marked: routeTo === '/inbox'}" @click="navigateTo('/inbox')">Inbox</router-link></li>
            <li class="list-email-folder-li" v-bind:class="{marked: routeTo === '/sent'}" @click="navigateTo('/sent')">Sent</router-link></li>
            <li class="list-email-folder-li" v-bind:class="{marked: routeTo === '/starred'}" @click="navigateTo('/starred')">Starred</router-link></li>
            <li class="list-email-folder-li" v-bind:class="{marked: routeTo === '/trash'}" @click="navigateTo('/trash')">Trash</router-link></li>
            <li class="list-email-folder-li" v-bind:class="{marked: routeTo === '/draft'}" @click="navigateTo('/draft')">Draft</li>
        </ul>
        </section>
    `,
    data() {
        return {
            routeTo: '',
        };
    },
    created() {
    },
    methods: {
        navigateTo(routeTo) {
            this.routeTo = routeTo;
            router.push({ path: routeTo });
        },
    },
    computed: {},
    unmounted() { },
};