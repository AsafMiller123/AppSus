import mailPreview from './mail-preview.cmp.js';
import { router } from './../../js/router.js'

export default {
    props: ['mails'],
    template: `
        <section class="mail-list-container">
            <div class="mails-list-upper-section">
                <span class="unread-emails-count"><strong>Unread Emails: </strong>{{getUnreadCount()}}</span>
                <strong>Sort By: </strong><select v-model="selected" class="sort-by">
                    <option>Ascending Date</option>
                    <option>Descending Date</option>
                    <option>Ascending Subject</option>
                    <option>Descending Subject</option>
                 </select>
            </div>
            <ul class="mail-list" v-if="mails?.length > 0">
                <li v-for="mail in mails" :key="mail.id" class="mail-preview-container" v-on:click="navigateToPreviewPage(mail,mail.id)">
                       <img class="icon" :src="getStarredStateImgUrl(mail)" @click.stop="updateStarredState(mail, !mail.isStarred)"></button>
                       <mail-preview :mail="mail" />
                       <img class="icon" src="icons/delete-icon.jpg" @click.stop="remove(mail.id)">
                       <img class="icon" :src="getReadStateImgUrl(mail)" @click.stop="updateReadState(mail, !mail.isRead)" />

                </li>
            </ul>
            <div v-else class="emails-list-empty-state">This Folder Is Empty...</div>
        </section>
    `,

    data() {
        return {
            count: 0,
            selected: 'Ascending Date',
        }
    },

    watch: {
        mails() {
            this.count = this.mails.length;
        },
    },

    methods: {
        remove(id) {
            this.$emit('remove', id);
        },
        updateReadState(mail, isRead) {
            mail.isRead = isRead;
            this.$emit('updateEmail', mail);
        },
        getStarredStateImgUrl(mail) {
            return mail.isStarred ? '../icons/star-favorite.png' : '../icons/star-unfavorite.png';
        },
        updateStarredState(mail, isStarred) {
            mail.isStarred = isStarred;
            this.$emit('updateEmail', mail);
        },
        navigateToPreviewPage(mail, id) {
            if (!mail.isRead) this.updateReadState(mail, true);
            router.push({ path: `/mail/${id}` });
        },

        getReadStateImgUrl(mail) {
            return mail.isRead ? 'icons/read-mail.png' : 'icons/unread-mail.png';
        },

        getUnreadCount() {
            return this.mails?.filter(mail => !mail.isRead).length;
        },
        sortEmails(value) {
            switch (value) {
                case 'Ascending Date':
                    this.sortEmailsByDate(true);
                    break;
                case 'Descending Date':
                    this.sortEmailsByDate(false);
                    break;
                case 'Ascending Subject':
                    this.sortEmailsBySubject(true);
                    break;
                case 'Descending Subject':
                    this.sortEmailsBySubject(false);
                    break;
            }
        },
        sortEmailsByDate(isAscending) {
            this.$emit('sortBySentDate', isAscending)
        },
        sortEmailsBySubject(isAscending) {
            this.$emit('sortBySubject', isAscending)
        },
    },
    watch: {
        selected(value) {
            this.sortEmails(value);
        }
    },

    computed: {},

    created() { },

    components: {
        mailPreview,
    },
}