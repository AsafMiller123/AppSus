export default {
    template: `
        <section class="mail-filter">
            <label>
                <input ref="subjectInput" class="search-email" @input="setFilter" type="text" v-model="filterBy.subject" placeholder="Search Email">
            </label>
        </section>
    `,
    data() {
        return {
            txt: '',
            filterBy: {
                subject: '',
            }
        }
    },
    created() {
    },
    mounted() {
        this.$refs.subjectInput.focus()
    },
    methods: {
        setFilter() {
            this.$emit('filtered', { ...this.filterBy })
        }
    },
    watch: {
        txt(newVal, oldVal) {
        },

        filterBy: {
            handler(newVal) {
            },
            deep: true
        }
    }
}