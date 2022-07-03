import { mailService } from '../services/mail-service.js'
import mailFilter from '../cmps/mail-filter.cmp.js'
import mailList from '../cmps/mail-list.cmp.js'
import { showSuccessMsg, showErrorMsg } from '../services/eventBus-service.js'
import emailFolderList from '../cmps/email-folder-list.cmp.js'

export default {
    template: `
        <section class="app-main">
            <mail-filter class="mail-filter" @filtered="setFilter" />
            <div class="mails-container">
                <mail-list :mails="mailsForDisplay" @remove="removeEmail" @updateEmail="updateEmail" @sortBySubject="sortBySubject" @sortBySentDate="sortBySentDate" >
            </div>
        </section>
    `,
    data() {
        return {
            mails: null,
            filterBy: null,
            count: 0
        }
    },
    created() {

    },
    methods: {
        removeEmail(id) {
            mailService.remove(id)
                .then(() => {
                    const idx = this.mails.findIndex((mail) => mail.id === id)
                    this.mails.splice(idx, 1)
                    showSuccessMsg('Deleted successfully')
                })
                .catch(err => {
                    showErrorMsg('Failed to remove')
                })
        },
        updateEmail(updatedMail) {
            mailService.put(updatedMail)
                .then(() => {
                    const idx = this.mails.findIndex((mail) => mail.id === updatedMail.id)
                    this.mails[idx] = updatedMail;
                    showSuccessMsg('Updated email state was updated successfully')
                })
                .catch(err => {
                    showErrorMsg('Updated email was failed to be updated')
                });
        },
        getAppropriateEmailsList(mails, currentRoute) {
            switch (currentRoute) {
                case '/inbox':
                    return mails.filter(mail => !mail.shouldBeRemoved && mail.isCompleted && mail.to === mailService.loggedInUser.email);
                case '/sent':
                    return mails.filter(mail => mail.to !== mailService.loggedInUser.email);
                case '/starred':
                    return mails.filter(mail => mail.isStarred);
                case '/trash':
                    return mails.filter(mail => mail.shouldBeRemoved);
                case '/draft':
                    return mails.filter(mail => !mail.isCompleted);
            }
        },
        sortBySubject(isAscending) {
            isAscending ? this.mails.sort((a, b) => a.subject.localeCompare(b.subject)) : this.mails.sort((a, b) => b.subject.localeCompare(a.subject));
        },
        sortBySentDate(isAscending) {
            isAscending ? this.mails.sort((a, b) => b.sentAt - a.sentAt) : this.mails.sort((a, b) => a.sentAt - b.sentAt);
        },

        setFilter(filterBy) {
            console.log('filterBy ', filterBy);

            this.filterBy = filterBy
        }

    },

    computed: {
        mailsForDisplay() {
            var mails = this.mails
            if (this.filterBy?.subject) {
                console.log('here');
                const regex = new RegExp(this.filterBy.subject, 'i')
                mails = mails.filter(mail => regex.test(mail.subject));
            }
            return mails;
        }
    },
    watch: {
        '$route.path': {
            handler() {
                const currentRoute = this.$route.path;
                mailService.query().then(mails => {
                    this.mails = this.getAppropriateEmailsList(mails, currentRoute);
                });
            },
            immediate: true
        },
    },

    components: {
        mailFilter,
        mailList,
        emailFolderList
    }
}

