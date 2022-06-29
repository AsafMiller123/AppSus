import { mailService } from "../services/mail-service.js"

export default {
    template: `
        <section v-if="mail"  class="app-main mail-details">
            <h4>mail details</h4>
            <img :src="mailImgUrl">
            <p>Vendor:{{mail.vendor}}</p>
            <p>Max speed:{{mail.maxSpeed}}</p>
            <hr />
            <router-link to="/mail">Back to List</router-link>
        </section>
    `,
    data() {
        return {
            mail: null,
            nextmailId: null
        }
    },
    created() {
    },
    computed: {
        mailImgUrl() {
            return `img/${this.mail.vendor}.png`;
        }
    },
    watch: {
        // '$route.params.mailId':{
        //     handler() {
        //         const id = this.$route.params.mailId
        //         mailService.get(id).then(mail => {
        //             this.mail = mail
        //             mailService.getNextmailId(mail.id)
        //                 .then(nextmailId => this.nextmailId = nextmailId)
        //         })
        //     },
        //     immediate: true
        // }
       
    }
}