import { mailService } from '../services/mail-service.js';
import { eventBus } from '../services/eventBus-service.js';

export default {
    template: `
        <section v-if="mailToEdit" class="mail-edit app-main">
            <!-- <form @submit.prevent="save"> -->
            <textArea>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odit, animi repellendus, esse dolore neque unde ipsum placeat corporis harum reprehenderit aliquam. Sequi asperiores, sit deleniti blanditiis velit accusamus ab incidunt.
            </textArea>
            </form>
        </section>
    `,
    data() {
        return {
            mailToEdit: null
        };
    },
    created() {
        const id = this.$route.params.mailId
        if (id) {
            mailService.get(id).then(mail => this.mailToEdit = mail)
        } else {
            this.mailToEdit = mailService.getEmptymail()
        }
    },
    methods: {
        save() {
            if (!this.mailToEdit.vendor) return;
            mailService.save(this.mailToEdit).then(mail => {
                this.$router.push('/mail')
                eventBus.emit('show-msg', { txt: 'Saved/Update successfully', type: 'success' });
            })
        }
    },
    computed: {
        pageTitle() {
            const id = this.$route.params.mailId
            return id ? 'Edit mail' : 'Add mail'
        }
    }
};