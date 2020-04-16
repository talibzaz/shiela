<template>
    <v-container>
       <div style="font-size: 22px;margin-bottom: 10px;" class="bold-font custom-color">{{ getEventSpecificReport.name}}</div>
        <v-layout elevation-2  pt-3 pb-3>
            <v-flex md6 d-flex justify-center align-center>
                <span class="bold-font cs-9">Tickets Sold :</span> <span class="bold-font custom-color cs-9">{{ getEventSpecificReport.ticketsSold}}</span> <span>|</span>
            </v-flex>
            <v-flex d-flex justify-center md6>
                <span class="bold-font cs-9">Revenue Generated :</span> <span class="bold-font custom-color cs-9">${{getEventSpecificReport.totalRevenue}}</span>
            </v-flex>
        </v-layout>
        <v-layout elevation-2  pt-3 pb-3 mt-4>
            <v-flex md8 d-flex justify- align-center pl-4>
                <span class="bold-font cs-9">No of days event was live for ticket sale :</span> <span class="bold-font custom-color cs-9">{{ getEventSpecificReport.ticketLiveDays}}</span> <span>|</span>
            </v-flex>
            <v-flex d-flex justify-center md4>
                <span class="bold-font cs-9">Event made live on :</span> <span class="bold-font custom-color cs-9">{{ dateString }}</span>
            </v-flex>
        </v-layout>
        <v-container elevation-2 fluid mt-5>
            <v-layout pb-3 style="border-bottom: 1px solid #ccc">
                <v-flex md5 d-flex>
                    <span style="width: 100px" class="bold-font cs-9">Page Views :</span> <span style="text-align: center" class="bold-font custom-color cs-9">{{getEventPageHitsByID}}</span>
                </v-flex>
                <v-flex md2 d-flex justify-center>|</v-flex>
                <v-flex md5 d-flex>
                    <span  style="width: 100px" class="bold-font cs-9">Sponsor Enquiries :</span> <span style="text-align: center" class="bold-font custom-color cs-9">{{sponsorEnquiriesCount}}</span>
                </v-flex>
            </v-layout>
            <v-layout pt-3>
                <v-flex md5 d-flex>
                    <span style="width: 100px" class="bold-font cs-9">Exhibitor Enquiries :</span> <span style="text-align: center" class="bold-font custom-color cs-9">{{exhibitorEnquiriesCount}}</span>
                </v-flex>
                <v-flex md2 d-flex justify-center>|</v-flex>
                <v-flex md5 d-flex>
                    <span  style="width: 100px" class="bold-font cs-9">Brochure Requests :</span> <span style="text-align: center" class="bold-font custom-color cs-9">{{totalBrochureRequests}}</span>
                </v-flex>
            </v-layout>
        </v-container>
    </v-container>
</template>

<script>
    import { GET_EVENT_SPECIFIC_REPORT_QUERY, Query_totalBrochureRequests, Query_exhibitorEnquiriesCount, Query_sponsorEnquiriesCount, Query_GetEventPageHitsByID } from "../../graphql";

    export default {
        name: "EventSpecificReport",
        props: ['eventID'],
        data () {
            return {
                getEventSpecificReport: '',
                dateString: '',
                exhibitorEnquiriesCount: 0,
                sponsorEnquiriesCount: 0,
                totalBrochureRequests: 0,
                getEventPageHitsByID: 0
            }
        },
        watch: {
            getEventSpecificReport: function (val) {
                this.dateString = new Date(parseInt(val.publishDate)).toLocaleDateString('en-GB', {
                    day : 'numeric',
                    month : 'short',
                    year : 'numeric'
                });
            }
        },
        created() {
            this.$apollo.query({
                query: Query_GetEventPageHitsByID,
                variables: {
                    eventId: this.eventID
                }
            })
            .then(res => {
                this.getEventPageHitsByID = res.data.getEventPageHitsByID
            })
            .catch(error => {
            })
        },
        apollo: {
            getEventSpecificReport: {
                query: GET_EVENT_SPECIFIC_REPORT_QUERY,
                variables() {
                    return {
                        id: this.eventID
                    }
                }
            },
            totalBrochureRequests: {
                query: Query_totalBrochureRequests,
                variables() {
                    return {
                        eventID: this.eventID
                    }
                }
            },
            exhibitorEnquiriesCount: {
                query: Query_exhibitorEnquiriesCount,
                variables() {
                    return {
                        eventID: this.eventID
                    }
                }
            },
            sponsorEnquiriesCount: {
                query: Query_sponsorEnquiriesCount,
                variables() {
                    return {
                        eventID: this.eventID
                    }
                }
            }
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
