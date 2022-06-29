import mailPreview from './mail-preview.cmp.js'

export default {
    props: ['mails'],
    template: `
        <section class="mail-list">
            <ul>
                <li v-for="mail in mails" :key="mail.id" class="mail-preview-container" >
                   <mail-preview :mail="mail" />
                   <div class="actions">
                       <button @click="remove(mail.id)">X</button>
                        <router-link :to="'/mail/edit/'+mail.id">email-preview</router-link>
                    </div>
                </li>
            </ul>
        </section>
    `,
    components: {
        mailPreview
    },
    methods: {
        remove(id) {
            this.$emit('remove', id);
        },
        select(mail) {
            this.$emit('selected', mail);
        }
    },
    computed: {}
}