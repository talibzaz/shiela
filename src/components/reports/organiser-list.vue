<template>
    <v-container>
        <v-layout>
            <card bgColor="#725ca4" sectionTitle="Organisers" :counts="getOrganizerProfilesCount"></card>
            <card bgColor="#03aee6" sectionTitle="Events Published" :counts="getTotalEventsCreated"></card>
            <card bgColor="#ebb762" sectionTitle="Revenue Generated"  :counts="totalRevenueGenerated"></card>
            <card bgColor="#5abf5e" sectionTitle="Eventackle Earnings" :counts="totalEtEarnings"></card>
        </v-layout>
        <v-flex mt-5 d-flex justify-center class="bold-font cs-5">List Of Organisers</v-flex>
        <v-layout mt-3>
            <div>
                <v-flex>
                    <datatable
                            :page="page"
                            :loading="loading"
                            :headers="headers"
                            :items="getOrganizersReport"
                            :pagination.sync="pagination"
                            hide-actions
                            class="elevation-1"
                            @getNextItems="executeQuery"
                    >
                    </datatable>
                </v-flex>
            </div>
        </v-layout>
    </v-container>
</template>

<script>
    import Card from '@/components/ui-components/card'
    import Datatable from '@/components/ui-components/datatable'
    import DashboardStatsCard from '@/components/ui-components/dashboard-stats-card'
    import {Query_getOrganizerProfilesCount} from "../../graphql";
    import {Query_getTotalEventsCreated, Query_TotalEtEarnings} from "../../graphql";
    import {Query_getOrganizersReport, TOTAL_REVENUE_GENERATED} from "../../graphql";

    export default {
        name: "OrganiserList",
        components: {
            Card,
            Datatable
        },
        data:function () {
            return{
                page:1,
                loading: true,
                pagination: {
                    rowsPerPage: 10,
                    sortBy: '',
                },
                headers: [
                    { text: 'Name of the Organiser', value: 'name' },
                    { text: 'No of Events Published ', value:'eventsCount' },
                    { text: 'Revenue Generated (USD) ', value:'revenueGenerated' },
                    { text: 'Eventackle Earnings(USD)', value:'totalEtEarning' },
                ],
                totalEtEarnings: 0,
                getOrganizersReport: [],
                getTotalEventsCreated: 0,
                getOrganizerProfilesCount: 0,
            }
        },
        methods: {
            executeQuery(page) {
                this.loading = true;
                this.$apollo.query({
                    query: Query_getOrganizersReport,
                    variables: {
                        offset: page-1
                    }
                })
                    .then(res => {
                        this.page = page;
                        this.getOrganizersReport = res.data.getOrganizersReport;
                    })
            }
        },
        watch: {
            getOrganizersReport: function (val) {
                if (val != null) {
                    this.loading = false;
                }
            }
        },
        apollo: {
            getOrganizerProfilesCount: {
                query: Query_getOrganizerProfilesCount
            },
            getTotalEventsCreated: {
                query: Query_getTotalEventsCreated
            },
            getOrganizersReport: {
              query: Query_getOrganizersReport,
              variables: {
                  offset: 0
              }
            },
            totalRevenueGenerated: {
                query: TOTAL_REVENUE_GENERATED,
            },
            totalEtEarnings: {
                query: Query_TotalEtEarnings
            }
        },
        computed: {
            pages() {
                if (this.pagination.totalItems / this.pagination.rowsPerPage > 1) {
                    return this.page+1
                } else {
                    return this.page
                }
            }
        }
    }
</script>

<style scoped>
    @import "../../styles/common.css";

    .cs-5{
        font-size: 20px;
    }


</style>
