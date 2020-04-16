<template>
    <v-container>
        <v-layout mb-3 class="bold-font titles">Ticket List</v-layout>
    <v-layout>
    <data-table
            :headers="headers"
            :items="getTicketList"
            :showAction="showAction"
            :loading="loading"
            @getNextItems="executeQuery"
            :page="page"
    >
    </data-table>
    </v-layout>
    </v-container>
</template>

<script>
    import DataTable from '@/components/ui-components/datatable'
    import { GET_TICKET_LIST_QUERY } from '../../graphql'

    export default {
        name: "TicketList",
        components: {
            DataTable
        },
        data () {
            return {
                headers: [
                    { text: 'Order No.', value: 'orderNo' },
                    { text: 'Purchased By', value: 'purchasedBy' },
                    { text: 'No. Of Tickets', value: 'noOfTickets'},
                    { text: 'Event Id', value: 'eventId'},
                    { text: 'Event', value: 'eventName'},
                ],
                showAction: false,
                getTicketList: [],
                page : 1,
                loading: true
            }
        },
        watch: {
            getTicketList: function (val) {
                if (val != null) {
                    this.loading = false;
                }
            }
        },
        apollo: {
            getTicketList : {
                query: GET_TICKET_LIST_QUERY,
                variables: {
                    offset: 0,
                }
            }
        },
        methods: {
            executeQuery(page) {
                this.loading = true
                this.$apollo.query({
                    query: GET_TICKET_LIST_QUERY,
                    variables: {
                        offset: page-1
                    }
                })
                    .then(response => {
                        this.getTicketList = response.data.getTicketList;
                        this.page = page;
                    })
            }
        }
    }
</script>

<style scoped>
    @import "../../styles/common.css";

</style>
