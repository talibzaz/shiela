<template>
    <v-container>
        <v-flex v-ripple d-flex justify-center mb-4 class="bold-font cs-5">List of Attendees</v-flex>
        <v-flex mb-2 class="bold-font cs-6">Filters ( Generate reports for)</v-flex>
        <v-container elevation-2>
            <v-layout d-flex justify-center mt-3>
                <v-flex md6>
                    <div class="cs-6 bold-font">Events Organised By</div>
                    <v-select
                            solo
                            :items="organizer"
                            item-value="value"
                            label="All"
                            @change="getEvents"
                    ></v-select>
                </v-flex>
                <v-flex d-flex align-center md1>
                    <span class="bold-font cs-6" style="display:flex;justify-content: center">Or</span>
                </v-flex>
                <v-flex md6>
                    <div class="cs-6 bold-font">Events</div>
                    <v-select
                            solo
                            :items="events"
                            item-value="value"
                            label="All"
                            @change="onEventChange"
                    ></v-select>
                </v-flex>
            </v-layout>
            <v-layout>
                <v-flex style="display: flex;justify-content: flex-end">
                    <v-btn class="bold-font" @click="getAttendees">Generate List</v-btn>
                </v-flex>
            </v-layout>
        </v-container>

        <v-layout mt-3>
            <v-flex>
                <datatable
                        :page="page"
                        :loading="loading"
                        :headers="headers"
                        :items="getEventAttendees | normalizeAttendees"
                        @getNextItems="executeQuery"
                >
                </datatable>
            </v-flex>
        </v-layout>

    </v-container>
</template>


<script>
    import Datatable from '@/components/ui-components/datatable'
    import {Query_getApprovedOrganizersList} from "../../graphql";
    import {Query_reportsEventList} from "../../graphql";
    import {Query_getEventAttendees} from "../../graphql";

    export default {
        name: "AttendeeList",
        components:{
            Datatable,
        },
        data() {
            return {
                page: 1,
                loading: false,
                headers: [
                    { text: 'Attendee Name', value: 'attendee' },
                    { text: 'Event Name ', value:'eventName' },
                    { text: 'Organizer Name ', value:'organizerName' },

                ],
                organizer_id: "all",
                event_id: "all",
                reportsEventList: [],
                getEventAttendees: [],
                getApprovedOrganizersList: [],
                organizer: [{text: "ALL", value: "all"}],
                events: [{text: "ALL", value: "all"}],

                items: [
                    {
                        "id": "1",
                        "attendeeName":"Sajad Ahmad Sofi",
                        "eventName":"Black Rebel Events",
                        "organiserName":"Mohammad Omer",
                    }
                ]
            }
        },
        watch: {
            getEventAttendees: function (val) {
                if (val != null) {
                    this.loading = false;
                }
            }
        },
        methods: {
            getEvents(value) {
                this.$apollo.query({
                    query: Query_reportsEventList,
                    variables: {
                        id: value
                    }
                }).then(res => {
                    this.events = [{text: "ALL", value: "ALL"}];
                    for (let i=0; i < res.data.reportsEventList.length; i++) {
                        this.events.push({text: res.data.reportsEventList[i].name, value: res.data.reportsEventList[i].id});
                    }
                });
                this.organizer_id = value;
            },
            onEventChange(value) {
              this.event_id = value;
            },
            getAttendees() {
                this.$apollo.query({
                    query: Query_getEventAttendees,
                    variables: {
                        eventId: this.event_id,
                        organizerId: this.organizer_id,
                        offset: 0
                    }
                }).then(res => {
                    this.getEventAttendees = res.data.getEventAttendees
                })
            },
            executeQuery(page){
                this.loading = true;
                this.$apollo.query({
                    query: Query_getEventAttendees,
                    variables: {
                        eventId: this.event_id,
                        organizerId: this.organizer_id,
                        offset: page-1
                    }
                }).then(res => {
                        this.page = page;
                        this.getEventAttendees = res.data.getEventAttendees
                })
            },
        },
        filters: {
          normalizeAttendees(attendees) {
              return attendees.reduce((acc, { attendee, organizerName, eventName }) => {
                  attendee.forEach(a => {
                      acc.push({ attendee: a, organizerName, eventName });
                  });
                  return acc;
              }, []);
          }
        },
        created() {
            this.$apollo.query({
                query: Query_getApprovedOrganizersList
            }).then(res => {
                for (let i=0; i < res.data.getApprovedOrganizersList.length; i++) {
                    this.organizer.push({text: res.data.getApprovedOrganizersList[i].name, value: res.data.getApprovedOrganizersList[i].id});
                }
            });
            this.$apollo.query({
                query: Query_getEventAttendees,
                variables: {
                    eventId: this.event_id,
                    organizerId: this.organizer_id,
                    offset: 0
                }
            }).then(res => {
                this.getEventAttendees = res.data.getEventAttendees
            })
        }
    }
</script>

<style scoped>
    @import "../../styles/common.css";

    .cs-5{
        font-size: 20px;
    }
    .cs-6{
        font-size: 16px;
    }

</style>