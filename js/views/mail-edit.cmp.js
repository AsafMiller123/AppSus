import { mailService } from '../services/mail-service.js';
import { eventBus } from '../services/eventBus-service.js';
import { router } from './../../js/router.js'
import mailList from '../cmps/mail-list.cmp.js'

export default {
    template: `
        <section class="mail-edit app-main">
            <form>  
                <h3>New Message</h3>
            <div class="mail-inputs">
                <div class="to-mail">
                    <strong>To:</strong>
                    <input class="input-message" v-model="mailToEdit.to" type=text />
                </div>
                <div class="copy-message">
                <strong>Cc:</strong>
                <input class="input-message" v-model="mailToEdit.cc" type=text>
                </div>
                <div class="bcc">
                <strong>Bcc:</strong>
                <input class="input-message" v-model="mailToEdit.bcc" type=text>
                </div>
                <div class="subject-message">
                    <strong>Subject:</strong>
                    <input class="input-message"  v-model="mailToEdit.subject" type=text>
                </div>
            </div>
                <textarea class="mail-body" name="mail-body" id="" cols="30" rows="10"  v-model="mailToEdit.body"></textarea>
                <button class="send-btn" v-on:click="navigateToPreviewPage()">send</button>
            </form>
        </section>
    `,
    data() {
        return {
            mailToEdit: {},
            saveInterval: null,
        }
    },
    created() {
        const id = this.$route.params.mailId
        if (id) {
            mailService.get(id).then(mail => this.mailToEdit = mail)
        } else {
            this.mailToEdit = mailService.getEmptyMail();

            this.saveInterval = setInterval(() => {
                if (this.$route.path !== '/mail/edit') {
                    clearInterval(this.saveInterval);
                } else {
                    this.save();
                }
            }, 5000);
        }
    },
    methods: {
        save() {
            this.mailToEdit.from = mailService.loggedInUser.email;
            mailService.save(this.mailToEdit).then(mail => {
                this.$router.push(`/mail/edit/${mail.id}`)
                eventBus.emit('show-msg', { txt: 'Saved/Update successfully', type: 'success' });
            })
        },
        navigateToPreviewPage() {
            clearInterval(this.saveInterval);
            this.onSendEmail();
            router.push({ path: '/inbox' });
        },
        onSendEmail() {
            this.mailToEdit.isCompleted = true;
            mailService.put(this.mailToEdit);
        },
    },
    computed: {
        pageTitle() {
            const id = this.$route.params.mailId
            return id ? 'Edit mail' : 'Add mail'
        }
    },
    components: {
        mailList
    },
    destroyed() {
        clearInterval(this.saveInterval);
    },
};