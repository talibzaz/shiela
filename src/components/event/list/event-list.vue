    <template>
        <v-container>
            <v-flex d-flex justify-center mb-4 class="bold-font cs-4" >Event List</v-flex>
            <v-layout>
        <datatable
                :headers="headers"
                :items="getEventList"
                :loading="loading"
                :showAction="showAction"
                @getNextItems="executeQuery"
                :page="page"
                @onAction="goToEvent"
        >
        </datatable>
            </v-layout>
        </v-container>
    </template>

<script>
    import Datatable from '@/components/ui-components/datatable'
    import { GET_ALL_EVENTS_QUERY } from '../../../graphql.js'

    export default {
        name: "EventList",
        components:{
            Datatable,
        },
        data () {
            return {
                headers: [
                    { text: 'Start Date', value: 'startDate' },
                    { text: 'Name', value:'name' },
                    { text: 'Organiser Name', value: 'organizerName' },
                    { text: 'Is Featured', value: 'isFeatured'},
                    { text: 'Status', value: 'status' }
                ],
                showAction: true,
                getEventList: [],
                page: 1,
                loading: true
            }
        },
        watch: {
            getEventList: function (val) {
                if (val != null) {
                    this.loading = false;
                }
            }
        },
        methods:{
            goToEvent(event) {
                this.$router.push({ name:'event/list/event-details', params: { eventID: event.id }})
            },
            executeQuery(page) {
                this.loading = true;
                this.$apollo.query({
                    query: GET_ALL_EVENTS_QUERY,
                    variables: {
                        offset: page-1
                    }
                })
                    .then(response => {
                        this.getEventList = response.data.getEventList;
                        this.page = page;
                    })
            }
        },
        apollo: {
            getEventList: {
                query: GET_ALL_EVENTS_QUERY,
                variables: {
                    offset: 0,
                },
                fetchPolicy: 'no-cache'
            }
        },
    }
</script>

<style scoped>
    @import "../../../styles/common.css";

    .cs-4{
        font-size: 20px;
    }
</style>
