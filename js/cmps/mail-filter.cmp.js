export default {
    template: `
        <section class="mail-filter">
            <input type="text" v-model="txt" />
            <label>
                Search
                <input ref="vendorInput" @input="setFilter" type="text" v-model="filterBy.vendor" placeholder="Search...">
            </label>
            <label>
                Min Speed:
                <input type="range" min="0" max="500" @change="setFilter" v-model.number="filterBy.minSpeed" />
                <span>{{filterBy.minSpeed}}</span>
            </label>
        </section>
    `,
    data() {
        return {
            txt: '',
            filterBy: {
                vendor: '',
                minSpeed: 0
            }
        };
    },
    created() {
    },
    mounted() {
        console.log(this.$refs.vendorInput)
        this.$refs.vendorInput.focus()
    },
    methods: {
        setFilter() {
            this.$emit('filtered', { ...this.filterBy })
        }
    },
    watch: {
        txt(newVal, oldVal) {
            console.log('Txt changed from:', oldVal, 'to:', newVal)
        },
        filterBy: {
            handler(newVal) {
                console.log('Filter changed', newVal)
            },
            deep: true
        }
    }
}