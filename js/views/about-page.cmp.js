import { showSuccessMsg } from "../services/eventBus-service.js";

export default {
    template: `
        <section class="about-page app-main">
            <h3>This is an about page</h3>
            <select v-model="heading">
                <option>p</option>
                <option>h3</option>
                <option>h2</option>
            </select>
            <component :is="heading">
                This is an about page
            </component>
            <button @click="callBus">Call the Bus</button>
            <hr />
            <nav>
                <router-link to="/about/team">Team</router-link> |
                <router-link to="/about/service">Services</router-link>
            </nav>
            <router-view />
            
        </section>
    `,
    data() {
        return {
            heading: 'h2'
        };
    },
    created() { },
    methods: {
        callBus() {
            showSuccessMsg('Lets Go')
        }
    },
    computed: {},
    unmounted() { },
};