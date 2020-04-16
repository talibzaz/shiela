<template>
    <v-container>
        <v-layout>
            <v-flex mb-3 class="bold-font titles">Upcoming Payouts</v-flex>
        </v-layout>
        <v-layout>
    <datatable
            :headers="headers"
            :items="upcomingPayouts"
            :showAction="showAction"
            :page="page"
            :loading="loading"
            @onAction="confirmMarkAsPaid"
            @getNextItems="executeQuery"
    >
    </datatable>
        </v-layout>
    </v-container>
</template>

<script>
    import Datatable from '../ui-components/datatable';
    import {Mutation_markAsPaidByEventId} from "../../graphql";
    import {Query_UpcomingPayouts} from "../../graphql";

    export default {
        name: "UpcomingPayouts",
        components: {
            Datatable
        },
        data() {
            return {
                headers: [
                    {text: "Name", value: "name"},
                    {text: "End Date", value: "endDate"},
                    {text: "Tickets Sold", value: "sold"},
                    {text: "Sale Amount", value: "saleAmount"},
                    {text: "ET Share", value: "etShare"},
                    {text: "Payout Amount", value:"payoutAmount"}
                ],
                showAction: true,
                page: 1,
                loading: true,
                upcomingPayouts: []
            }
        },
        watch: {
            upcomingPayouts: function (val) {
                if (val != null) {
                    this.loading = false;
                }
            }
        },
        methods: {
            executeQuery(page) {
                this.loading = true;
                this.$apollo.query({
                    query: Query_UpcomingPayouts,
                    variables: {
                        offset: page-1,
                        limit: 11
                    }
                })
                    .then(res => {
                        this.upcomingPayouts = res.data.upcomingPayouts;
                        this.page = page;
                    });
            },
            confirmMarkAsPaid(organizer) {
                //generate yes / no modal.

                //gql mutation query to set data as mark as paid.
                this.$apollo.mutate({
                    mutation: Mutation_markAsPaidByEventId,
                    variables: {
                        eventId: organizer.id,
                        name: organizer.name,
                        endDate: organizer.endDate,
                        sold: organizer.sold,
                        salesAmount: organizer.salesAmount,
                        etShare: organizer.etShare,
                        payoutAmount: organizer.payoutAmount
                    }
                }).then(res => {
                    alert(res.data.markAsPaidByEventId.message)
                })
            }
        },
        apollo: {
            upcomingPayouts: {
                query: Query_UpcomingPayouts,
                variables: {
                    offset: 0,
                    limit: 11
                }
            }
        }
    }
</script>

<style scoped>
    @import "../../styles/common.css";

</style>
