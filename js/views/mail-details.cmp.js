import { mailService } from "../services/mail-service.js"

export default {
    template: `
    <div class="mail-details-container">
        <div class="back-to-inbox-container"><router-link to="/" class="back-to-inbox">🠔</router-link><div>
        <section v-if="mail" class="app-main mail-details">
            <div class="mail-detail ellipsis"><strong>Subject: </strong>{{mail.subject}}</div>
            <div class="mail-detail ellipsis"><strong>From: </strong>{{mail.from}}</div>
            <div class="mail-body">{{mail.body}}</div>
        </section>
    </div>
    
    `,
    data() {
        return {
            mail: null,
            nextMailId: null
        }
    },
    created() {
    },
    computed: {
    },
    watch: {
        '$route.params.mailId': {
            handler() {
                const id = this.$route.params.mailId;
                mailService.get(id).then(mail => {
                    this.mail = mail;
                })
            },
            immediate: true
        }
    }
}