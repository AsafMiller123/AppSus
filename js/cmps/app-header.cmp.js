import mailFilter from '../cmps/mail-filter.cmp.js'
import { eventBus } from '../services/eventBus-service.js';

export default {
    template: `
        <header class="app-header">
            Mister Email
        </header>
    `,

    data() {
        return {
            filterBy: null,
        }
    },


    methods: {},

    components: {
        mailFilter

    },
}