export default {
    props: ['mail'],
    template: `
        <section class="mail-preview">
            <p>{{mail.name}}</p>
            <p class="mail-subject ellipsis">{{mail.subject}}</p>
            <p class="mail-preview-body ellipsis">{{mail.body}}</p>
            <p class="mail-sending-time">{{(new Date(mail.sentAt)).toLocaleDateString()}}</p>
        </section>
    `,
    data() {
        return {}
    },
    created() { },
    methods: {},
    computed: {}
}
