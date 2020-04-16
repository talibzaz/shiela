<template>
    <v-container>
        <v-flex d-flex justify-center mb-4 class="bold-font cs-4" >Ongoing Events</v-flex>
        <v-layout>
            <datatable
                    :headers="headers"
                    :items="getOngoingEvents"
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
    import { GET_ONGOING_EVENTS_QUERY } from '../../../graphql.js'

    export default {
        name: "OngoingEventList",
        components:{
            Datatable,
        },
        data () {
            return {
                headers: [
                    { text: 'Start Date', value: 'startDate' },
                    { text: 'Name', value:'name' },
                    { text: 'Organiser Name', value: 'organizerName' },
                    { text: 'User Name', value: 'userName'},
                    { text: 'Status', value: 'status' }
                ],
                showAction: true,
                getOngoingEvents: [],
                page: 1,
                loading: true
            }
        },
        watch: {
            getOngoingEvents: function (val) {
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
                this.$apollo.query({
                    query: GET_ONGOING_EVENTS_QUERY,
                    variables: {
                        offset: page-1
                    }
                })
                    .then(response => {
                        this.getOngoingEvents = response.data.getOngoingEvents;
                        this.page = page;
                    })
            }
        },
        apollo: {
            getOngoingEvents: {
                query: GET_ONGOING_EVENTS_QUERY,
                variables: {
                    offset: 0,
                }

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
