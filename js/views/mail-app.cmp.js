import { mailService } from '../services/mail-service.js'
import mailFilter from '../cmps/mail-filter.cmp.js'
import mailList from '../cmps/mail-list.cmp.js'
import { showSuccessMsg, showErrorMsg } from '../services/eventBus-service.js'

export default {
    template: `
        <section class="app-main">
           <mail-filter @filtered="setFilter" />
           <router-link to="/mail/edit">Add new mail</router-link>
           <mail-list :mails="mailsForDisplay" @remove="removeMail"  />
        </section>
    `,
    data() {
        return {
            mails: null,
            filterBy: null
        }
    },
    created() {
        mailService.query().then(mails => this.mails = mails)
    },
    methods: {
        removeMail(id) {
            mailService.remove(id)
                .then(() => {
                    console.log('Deleted successfully')
                    const idx = this.mails.findIndex((mail) => mail.id === id)
                    this.mails.splice(idx, 1)
                    showSuccessMsg('Deleted successfully')
                })
                .catch(err => {
                    console.log(err)
                    showErrorMsg('Failed to remove')
                })
        },
        setFilter(filterBy) {
            this.filterBy = filterBy
        }
    },
    computed: {
        mailsForDisplay() {
            var mails = this.mails
            if (this.filterBy?.vendor) {
                const regex = new RegExp(this.filterBy.vendor, 'i')
                mails = mails.filter(mail => regex.test(mail.vendor))
            }
            if (this.filterBy?.minSpeed) {
                mails = mails.filter(mail => mail.maxSpeed >= this.filterBy.minSpeed)
            }
            return mails
        }
    },
    components: {
        mailFilter,
        mailList,
    },
}
