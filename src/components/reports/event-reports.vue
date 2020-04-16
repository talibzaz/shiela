<template>
    <v-container>
        <div style="font-size: 22px;margin-bottom: 10px;" class="bold-font custom-color">Overview</div>
        <v-layout elevation-2  pt-3 pb-3 mb-4>
            <v-flex md4 d-flex justify- align-center pl-4>
                <span class="bold-font cs-9">Events held</span> <span class="bold-font custom-color cs-9">{{getEventsOverview.eventsHeld}}</span> <span>|</span>
            </v-flex>
            <v-flex md4 d-flex justify-center align-center>
                <span class="bold-font cs-9">Tickets Sold</span> <span class="bold-font custom-color cs-9">{{getEventsOverview.ticketsSold}}</span> <span>|</span>
            </v-flex>
            <v-flex d-flex justify-center md4>
                <span class="bold-font cs-9">Revenue Generated</span> <span class="bold-font custom-color cs-9">${{getEventsOverview.totalRevenue}}</span>
            </v-flex>
        </v-layout>
        <div class="bold-font custom-color" style="font-size: 22px;margin-bottom: 10px;">Top 5 Events</div>
        <v-layout>
            <v-flex md6 mr-2 elevation-2>
                <div v-for="item in topEvents"style="display: flex;padding: 10px">
                    <div style="background-color: #efefef;display:flex;flex-direction:column;width: 50px;height: 50px;border-radius: 4px;justify-content: center">
                        <div style="align-self: center;font-size: 16px;" class="custom-color bold-font">{{item.startDay}}</div>
                        <div style="align-self: center" class="normal-font">{{item.startMonth}}</div>
                    </div>
                    <div style="margin-left: 10px;">
                        <span class="bold-font" style="font-size: 18px">{{item.name}}</span>
                        <div class="normal-font" style="font-size: 16px;">{{ item.location}}</div>
                    </div>
                </div>
            </v-flex>
            <v-flex md6 elevation-2>
                <column-chart :data="chartData" :colors="['orange', '#666']" />
            </v-flex>
        </v-layout>
        <div style="font-size: 22px;margin: 20px 0;" class="bold-font custom-color">Event Specific Reports</div>
        <v-layout>
            <v-flex>
                <datatable
                        :headers="headers"
                        :items="getEventList"
                        :loading="loading"
                        :showAction="showAction"
                        @getNextItems="executeQuery"
                        :page="page"
                        @onAction="goToEventSpecificReport"
                >
                </datatable>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import Datatable from '@/components/ui-components/datatable';
    import { GET_TOP_EVENTS_QUERY } from "../../graphql";
    import { GET_ALL_EVENTS_QUERY } from "../../graphql";
    import { GET_EVENT_OVERVIEW_QUERY } from "../../graphql";

    export default {
        name: "EventReports",
        components:{
            Datatable,
        },
        data () {
            return {
                chartData : [],
                headers: [
                    {text: 'Organiser Name', value: 'organizerName'},
                    {text: 'Event Name', value: 'name'},
                    {text: 'Tickets Sold', value: 'ticketsSold'},
                ],
                showAction: true,
                getTopEvents: [],
                getEventList: [],
                loading: true,
                page: 1,
                getEventsOverview: '',
                date: '',
                month: '',
                topEvents: [],

            }
        },
        methods: {
            goToEventSpecificReport(event){
                this.$router.push({name:'report/event-specific-report',params:{eventID:event.id}})
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
        created() {
            this.$apollo.query({
                query: GET_TOP_EVENTS_QUERY
            }).then(res => {
                this.getTopEvents = res.data.getTopEvents
            })
        },
        apollo: {
            getEventList: {
                query: GET_ALL_EVENTS_QUERY,
                variables: {
                    offset: 0,
                }
            },
            getEventsOverview: {
                query: GET_EVENT_OVERVIEW_QUERY,
            }
        },
        watch: {
            getTopEvents: function (val) {
                for(let i = 0; i < val.length; i++) {
                    this.topEvents[i] = Object.create(val[i]);
                    this.topEvents[i].startDay = new Date(parseInt(val[i].startDate)).toLocaleDateString('en-GB', {
                        day : 'numeric'
                    });
                    this.topEvents[i].startMonth  = new Date(parseInt(val[i].startDate)).toLocaleDateString('en-GB', {
                        month : 'short'
                    });

                }
                this.chartData.push({"name": "revenue", "data": {}});
                for ( let i = 0; i < val.length; i ++) {
                    this.chartData[0].data[val[i].name] = val[i].revenue
                }
                this.chartData.push({"name": "tickets sold", "data": {}});
                for ( let i = 0; i < val.length; i ++) {
                    this.chartData[1].data[val[i].name] = val[i].ticketsSold
                }
            },
            getEventList: function (val) {
                if (val != null) {
                    this.loading = false;
                }
            },
        }
    }
</script>

<style scoped>
    @import "../../styles/common.css";
    .cs-9{
        font-size: 18px;
    }
    .custom-color{
        color: #fd8c36;
    }

</style>
