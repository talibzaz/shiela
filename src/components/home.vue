<template>
    <v-container>
        <v-flex mb-3 d-flex justify-center class="bold-font cs-font-dashboard">Dashboard</v-flex>
        <v-flex mb-2 class="bold-font cs-font-status">Main Status</v-flex>
        <v-layout>
            <card bgColor="#725ca4" sectionTitle="User Profiles"      :counts="getUserProfilesCount"></card>
            <card bgColor="#03aee6" sectionTitle="Organiser Profiles" :counts="getOrganizerProfilesCount"></card>
            <card bgColor="#ebb762" sectionTitle="Revenue Generated"  :counts=totalRevenueGenerated></card>
            <card bgColor="#5abf5e" sectionTitle="Events Created"     :counts="getTotalEventsCreated"></card>
        </v-layout>

        <v-layout mt-5>
            <dashboard-stats-card bgColor="#36495e" sectionTitle="Awaiting Approval" counts="4" userType="Organiser Profiles" btnLabel="Approve" @click="goToRequestList"></dashboard-stats-card>
            <dashboard-stats-card bgColor="#36495e" sectionTitle="Upcoming Payouts"  counts="2" userType="Events Over" btnLabel="Payouts" @click="goToPayouts"></dashboard-stats-card>
            <dashboard-stats-card bgColor="#36495e" sectionTitle="Ongoing Events"    counts="3" userType="Events" btnLabel="Event List" @click="goToEventList"></dashboard-stats-card>
            <dashboard-stats-card bgColor="#36495e" sectionTitle="Reports" userType="See Reports" btnLabel="Reports List" @click="goToReports"></dashboard-stats-card>
        </v-layout>

        <v-layout mt-5>
            <v-flex md6 mr-3 elevation-2 pt-3 pb-3>
                <div style="display: flex;justify-content: space-between;">
                    <div class="bold-font" style="margin-left: 20px;font-size: 18px;margin-top: 15px;">Highest Page Views</div>
                    <div style="width: 150px;margin-right: 10px;">
                        <v-select
                                solo
                                :items="selectItems"
                                label="Month"
                                @change="pageHitsData"
                        ></v-select>
                    </div>
                </div>
                <bar-chart :colors="['#8be1cb']" :data="pageChartData"></bar-chart>
                <div style="display: flex;justify-content: center;padding: 10px;">
                    <div class="bold-font" style="font-size: 18px;margin-left: 10px;"></div>
                    <div style="margin-left: 20px;font-size: 18px;" class="bold-font">Page Views</div>
                </div>
            </v-flex>
            <v-flex md6 elevation-2 pt-3 pb-3>
                <div style="display: flex;justify-content: space-between;">
                    <div class="bold-font" style="margin-left: 20px;font-size: 18px;margin-top: 15px;">Event Overview</div>
                    <div style="width: 150px;margin-right: 10px;">
                        <v-select
                                solo
                                :items="selectItems"
                                label="Month"
                                @change="getTopEventsData"
                        ></v-select>
                    </div>
                </div>
                <column-chart  :data="chartData" :colors="['#fd8c36', '#2c3e50','#aaa1e9']" />
                <div style="display: flex;justify-content: center;padding: 10px;">
                    <div class="bold-font" style="font-size: 18px;margin-left: 10px;">Top 5 events</div>
                </div>
            </v-flex>
        </v-layout>
        <v-layout mt-5>
            <v-flex md8 mr-3>
                <v-flex class="bold-font mb-2">LATEST EVENTS</v-flex>

                <datatable
                        :headers="headers"
                        :items="getRecentEvents"
                >
                </datatable>
            </v-flex>
            <v-flex elevation-4 md4 pt-3 pl-3 pr-3 mt-4>
                <v-flex class="bold-font">UPCOMING PAYOUTS</v-flex>
                <div style="margin-bottom: 20px" v-for="item in upcomingPayouts">
                <div style="display: flex;border-top: 1px solid #ececec;border-right:1px solid #ececec;border-left:1px solid #ececec;margin-top:10px; ">
                    <img class="img-style" src="https://unsplash.com/photos/A5E-ym6WyGM/download?force=true" alt="">
                    <div>
                    <div class="overflow-style normal-font" style="margin-top: 16px;">{{item.name}}</div>
                    <div style="margin-top: -1px" class="overflow-style normal-font">{{item.endDate}}</div>
                    </div>
                </div>
                <div style="border: 1px solid #ececec;display: flex">
                    <div class="bold-font" style="width: 50%;text-align: center;padding: 10px 0;border-right: 1px solid #ececec">${{item.payoutAmount}}</div>
                    <button class="bold-font" style="width: 50%;background-color:#e7f8f2;color:#47adb1" @click="goToPayouts">Payout Details</button>
                </div>
                </div>

            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import axios from "axios";
    import * as Constants from '../constants'
    import Card from '@/components/ui-components/card';
    import Datatable from '@/components/ui-components/datatable';
    import DashboardStatsCard from '@/components/ui-components/dashboard-stats-card';
    import {Query_getUserProfilesCount} from "../graphql";
    import {Query_getOrganizerProfilesCount} from "../graphql";
    import {Query_getTotalEventsCreated} from "../graphql";
    import {Query_getRecentEvents} from "../graphql";
    import {Query_UpcomingPayouts} from "../graphql";
    import { TOTAL_REVENUE_GENERATED } from "../graphql";
    import { GET_TOP_EVENTS_QUERY } from "../graphql";

    export default {
        name: "Home",
        components:{
            Card,
            DashboardStatsCard,
            Datatable
        },
        data:function () {
            return {
                pageChartData: [],
                selectItems: ['Week', 'Month', 'Year'],
                chartData: [],
                headers: [
                    { text: 'Name', value: 'name' },
                    { text: 'Organizer', value:'organizerName' },
                    { text: 'Start Date ', value:'startDate' },

                ],
                totalRevenueGenerated: "",
                getRecentEvents: [],
                getUserProfilesCount: 0,
                getOrganizerProfilesCount: 0,
                getTotalEventsCreated: 0,
                upcomingPayouts: []
            }
        },
        created: function() {
            axios.get(Constants.pageViewURI(), {
                params: {
                    duration: "month",
                    eventName: "eventPage"
                }
            }).then(res => {
                this.pageChartData = res.data;
            });

            this.$apollo.query({
                query: GET_TOP_EVENTS_QUERY,
                variables: "month"
            }).then(res => {

                this.chartData.push({"name": "Revenue", "data": {}});
                for ( let i = 0; i < res.data.getTopEvents.length; i ++) {
                    this.chartData[0].data[res.data.getTopEvents[i].name] = res.data.getTopEvents[i].revenue
                }

                this.chartData.push({"name": "Tickets Sold", "data": {}});
                for ( let i = 0; i < res.data.getTopEvents.length; i ++) {
                    this.chartData[1].data[res.data.getTopEvents[i].name] = res.data.getTopEvents[i].ticketsSold
                }
            })

        },
        apollo: {
            getUserProfilesCount: {
                query: Query_getUserProfilesCount
            },
            getOrganizerProfilesCount: {
                query: Query_getOrganizerProfilesCount
            },
            getTotalEventsCreated: {
                query: Query_getTotalEventsCreated
            },
            getRecentEvents: {
                query: Query_getRecentEvents
            },
            upcomingPayouts: {
                query: Query_UpcomingPayouts,
                variables: {
                    offset: 0,
                    limit: 4
                }
            },
            totalRevenueGenerated: {
                query: TOTAL_REVENUE_GENERATED,
            }

        },
        methods: {
            goToEventList() {
                this.$router.push({name: 'event/list/ongoing-event-list'})
            },
            goToRequestList() {
                this.$router.push({name: 'organiser/request-list'})
            },
            goToPayouts() {
                this.$router.push({name: 'finance/payouts'})
            },
            goToReports() {
                this.$router.push({path: 'reports/event-reports'})
            },
            pageHitsData(value) {
                axios.get(Constants.pageViewURI(), {
                    params: {
                        duration: value,
                        eventName: "eventPage"
                    }
                }).then(res => {
                    this.pageChartData = res.data;
                })
            },
            getTopEventsData(value) {
                this.$apollo.query({
                    query: GET_TOP_EVENTS_QUERY,
                    variables: {
                        duration: value
                    },
                    fetchPolicy: 'no-cache'
                }).then(res => {
                    this.chartData = [];
                    this.chartData.push({"name": "Revenue", "data": {}});
                    for ( let i = 0; i < res.data.getTopEvents.length; i ++) {
                        this.chartData[0].data[res.data.getTopEvents[i].name] = res.data.getTopEvents[i].revenue
                    }
                    this.chartData.push({"name": "Tickets Sold", "data": {}});
                    for ( let i = 0; i < res.data.getTopEvents.length; i ++) {
                        this.chartData[1].data[res.data.getTopEvents[i].name] = res.data.getTopEvents[i].ticketsSold
                    }
                })
            }
        },
        watch: {
            getTopEvents: function (val) {
                console.log(val);
                this.chartData.push({"name": "Revenue", "data": {}});
                for ( let i = 0; i < val.length; i ++) {
                    this.chartData[0].data[val[i].name] = val[i].revenue
                }
                this.chartData.push({"name": "Tickets Sold", "data": {}});
                for ( let i = 0; i < val.length; i ++) {
                    this.chartData[1].data[val[i].name] = val[i].ticketsSold
                }
            }
        }
    }
</script>

<style scoped>
    @import "../styles/common.css";

    .e-name{
        width: 200px;
        background-color: red;
        font-size: 16px;
        margin-left: 10px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }
    .img-style {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin: 10px 0 10px 10px;
    }
    .overflow-style{
        margin: 10px;
    }
    .cs-font-dashboard{
        font-size: 20px;
    }
    .cs-font-status{
        font-size: 16px;
    }
</style>
