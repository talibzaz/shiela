<template>
    <v-container>
        <label class=" cs-2 cs-3 bold-font" style="margin-bottom: 20px;">{{getEventById.name}}</label>
        <v-layout>
            <v-flex class="infoWrapperOne">
                <v-flex md4 class="publishedDate cs-1 bold-font formattedText"> Published Date : <span> {{ dateString }}</span></v-flex>
                <v-flex md4 class="soldAmount cs-1 bold-font formattedText"> Sold Amount :<span> {{getEventById.soldAmount}}{{getEventById.currency}}</span></v-flex>
                <v-flex md4 class="ticketsSold cs-1 bold-font formattedText"> Tickets Sold :<span> {{getEventById.ticketsSold}}</span></v-flex>
                <v-flex md2>
                    <v-switch
                            v-model="switch1"
                            :label="`Featured Event`"
                            @change="updateFeaturedEvent"
                    ></v-switch>
                </v-flex>
                <v-flex style="align-self: center">
                    <v-btn class="bold-font" @click="goToSales">Sales</v-btn>
                </v-flex>
                <v-flex style="align-self: center">
                    <v-btn class="bold-font" v-if="!getEventById.deactivated" @click="dialog = true">Deactivate</v-btn>
                    <v-btn class="bold-font" v-if="getEventById.deactivated" @click="activateDialog = true">Activate</v-btn>
                    <v-dialog
                            v-model="dialog"
                            max-width="290"
                    >
                        <v-card>
                            <v-card-title class="headline">Event Deactivation!</v-card-title>

                            <v-card-text>
                                Are you sure you want to deactivate the event?
                            </v-card-text>

                            <v-card-actions>
                                <v-spacer></v-spacer>

                                <v-btn
                                        color="green darken-1"
                                        flat="flat"
                                        @click="dialog = false"
                                >
                                    CANCEL
                                </v-btn>

                                <v-btn
                                        color="green darken-1"
                                        flat="flat"
                                        @click="deactivateEvent"
                                >
                                    YES
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                    <v-dialog
                            v-model="activateDialog"
                            max-width="290"
                    >
                        <v-card>
                            <v-card-title class="headline">Event Activation!</v-card-title>

                            <v-card-text>
                                Are you sure you want to activate the event?
                            </v-card-text>

                            <v-card-actions>
                                <v-spacer></v-spacer>

                                <v-btn
                                        color="green darken-1"
                                        flat="flat"
                                        @click="activateDialog = false"
                                >
                                    CANCEL
                                </v-btn>

                                <v-btn
                                        color="green darken-1"
                                        flat="flat"
                                        @click="activateEvent"
                                >
                                    YES
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-flex>
            </v-flex>
        </v-layout>
        <v-layout>
            <v-flex>
                <img class="cs-image" v-bind:src="getEventById.imageData" alt=""/>
            </v-flex>
        </v-layout>
        <v-layout>
            <v-flex>
                <v-alert
                        :value="featuredAlert"
                        type="success"
                        transition="scale-transition"
                >
                    {{featuredMessage}}
                </v-alert>
            </v-flex>
        </v-layout>
        <v-layout>
            <v-flex class="infoWrapperTwo">
                <v-flex class="publishedDate bold-font cs-1 formattedText"> Location : <span>{{getEventById.location}}</span> </v-flex>
                <v-flex class="soldAmount bold-font cs-1 formattedText">Date / Time: <span>{{getEventById.startTime}} {{getEventById.startDate}}</span></v-flex>
            </v-flex>
        </v-layout>
        <v-layout>
            <v-flex class="infoWrapperTwo">
                <v-flex class="ticketsSold cs-1 bold-font formattedText"> Categories : <span v-for="item in getEventById.categories"> {{ item }}, </span> </v-flex>
                <v-flex class=" cs-1 bold-font formattedText">Type of Event : <span v-for="item in getEventById.types"> {{ item }}, </span></v-flex>
            </v-flex>
        </v-layout>
        <v-layout v-if="show">
            <v-form ref="form" v-model="valid" lazy-validation>
            <v-flex>
                <v-flex class="cs-1 bold-font formattedText">ET Commission Rate</v-flex>
                <v-text-field
                        solo
                        v-model="etShare"
                        type="number"
                        :rules="etRules"
                        label="Update Eventackle Commission Rate for this event."
                ></v-text-field>
                <v-btn class="white--text" color="blue darken-2" :loading="updateLoader" @click="updateCommission">Update</v-btn>
            </v-flex>
            </v-form>
        </v-layout>
        <v-layout>
            <v-flex>
                <v-alert
                        :value="alert"
                        type="success"
                        transition="scale-transition"
                >
                    Et Commission Rate successfully updated for this event.
                </v-alert>
            </v-flex>
        </v-layout>
        <v-layout>
            <v-flex>
                <label class="cs-2 cs-3 bold-font" style="margin-top: 20px;">Description</label>
                <v-flex class="descriptionText normal-font">{{getEventById.description}}</v-flex>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import { GET_EVENT_BY_ID_QUERY } from '../../../graphql'
    import { UPDATE_FEATURED_EVENT_MUTATION, Mutation_UpdateEventEtCommission } from "../../../graphql";
    import {Mutation_DeactivateEventByID, Mutation_ActivateEventByID} from "../../../graphql";

    export default {
        name: "EventDetails",
        props: ['eventID'],
        data () {
            return {
                alert:false,
                featuredAlert: false,
                show: true,
                valid: true,
                etShare: '',
                featuredMessage: '',
                updateLoader: false,
                etRules: [
                    v => (v && v.length <= 6 ) || 'Incorrect Value',
                    v => !/-/.test(v) || 'Must be valid number'
                ],
                getEventById: '',
                switch1: false,
                dateString: '',
                dialog: false,
                activateDialog: false
            }
        },
        watch: {
            getEventById: function(val) {
                let dateNow = Date.now();
                let dt = `${val.endDate} ${val.endTime}`;
                let endDate = new Date(dt);

                if (dateNow > endDate){
                    this.show = false;
                };
                this.switch1 = val.isFeatured;
                this.dateString = new Date(parseInt(val.publishDate)).toLocaleDateString('en-GB', {
                    day : 'numeric',
                    month : 'short',
                    year : 'numeric'
                });
            },
        },
        methods: {
            updateCommission(){
                if (this.$refs.form.validate()) {
                    this.updateLoader = true;
                    this.$apollo.mutate({
                        mutation: Mutation_UpdateEventEtCommission,
                        variables: {
                            eventId: this.eventID,
                            etCommission: this.etShare
                        }
                    }).then(res => {
                        if (res.data.updateEventEtCommission.status){
                            this.alert = true;
                            this.updateLoader = false;
                            setTimeout( () => {
                                this.alert = false
                            }, 4000)
                        } else {
                            this.updateLoader = false;
                            alert(res.data.updateEventEtCommission.message)
                        }
                    }).catch(e => {
                        alert(e)
                    })
                }
            },
            deactivateEvent(){
                this.$apollo.mutate({
                    mutation: Mutation_DeactivateEventByID,
                    variables: {
                        eventID: this.eventID
                    }
                }).then(res => {
                    this.dialog = false;
                    this.$router.go();
                })
            },
            activateEvent(){
                this.$apollo.mutate({
                    mutation: Mutation_ActivateEventByID,
                    variables: {
                        eventID: this.eventID
                    }
                }).then(res => {
                    this.activateDialog = false;
                    this.$router.go();
                })
            },
            goToSales(salesID){
                this.$router.push({name:'orders/order-sales',params: { eventID: this.eventID }})
            },
            updateFeaturedEvent(event) {
                this.$apollo.mutate({
                    mutation: UPDATE_FEATURED_EVENT_MUTATION,
                    variables: {
                       id: this.eventID,
                       feature: this.switch1
                    }
                })
                .then(response => {
                    if ( response.data.updateFeaturedEvent.status ) {
                        this.featuredMessage = 'Event Updated Successfully!!';
                        this.featuredAlert = true;

                        setTimeout(()=>{
                            this.featuredAlert = false;
                        }, 3000)
                    }
                })
            }
        },
        apollo: {
            getEventById: {
                query: GET_EVENT_BY_ID_QUERY,
                variables() {
                    return {
                        id: this.eventID
                    };
                }
            }
        }

    }
</script>

<style scoped>
    @import "../../../styles/common.css";
    .infoWrapperOne{
        display: flex;
        background-color: #ececec;
        width: 100%;
        margin-bottom: 10px;
        border-radius: 4px;
    }
    .infoWrapperTwo{
        display: flex;
        background-color: #ececec;
        width: 100%;
        margin-top: 5px;
        border-radius: 4px;
    }
    .cs-1{
        padding: 18px 10px;
        font-size: 14px;
    }
    .cs-image{
        width:100%;
        height:300px;
        object-fit: cover;
        object-position: center center;
        border-radius: 4px;
    }
    .descriptionText{
        font-size: 18px;
        padding: 10px 0 40px 0;
    }
    .formattedText{
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }
    .cs-2{
        font-size:20px;
    }
    .cs-3{
        display: flex;
        justify-content: center;
    }
</style>
