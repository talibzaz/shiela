<template>
    <v-layout>
        <v-dialog
                v-model="dialog"
                hide-overlay
                persistent
                width="300"
        >
            <v-card
                    color="primary"
                    dark
            >
                <v-card-title class="headline">
                    {{loaderMessage}}
                    <v-progress-linear
                            v-if="loaderMessage === 'Please stand by'"
                            indeterminate
                            color="white"
                            class="mb-0"
                    ></v-progress-linear>
                </v-card-title>
            </v-card>
        </v-dialog>
        <template>
            <v-container elevation-2>
                <v-flex style="margin-bottom: 10px">Organiser Profile</v-flex>
                <v-layout>
                    <v-flex xs12 sm6 mr-3>
                        <v-text-field
                                solo
                                readonly
                                label="Name"
                                :value="getOrganizerByID.organizerProfile.name"
                        ></v-text-field>
                    </v-flex>
                    <v-flex style="margin-top: -33px">
                        <div style="margin-bottom: 8px">Organiser Image</div>
                        <img width="300px" height="300px" v-bind:src="image" alt="image">
                    </v-flex>

                </v-layout>
                <v-flex md6>
                    <v-textarea style="margin-top: -230px"
                            solo
                            required
                            readonly
                            auto-grow
                            label="Description"
                            :value="getOrganizerByID.organizerProfile.description"
                    ></v-textarea>
                </v-flex>
                <v-flex xs12 sm6 mr-3>
                    <v-text-field
                            solo
                            readonly
                            label="Website"
                            :value="getOrganizerByID.organizerProfile.website"
                    ></v-text-field>
                </v-flex>

                <v-flex style="margin-bottom: 10px">Contact Details</v-flex>
                <v-flex xs12 sm6 mr-3>
                    <v-text-field
                            solo
                            readonly
                            label="Name"
                            :value="getOrganizerByID.userProfile.userName"
                    ></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 mr-3>
                    <v-text-field
                            solo
                            readonly
                            label="Position"
                            :value="getOrganizerByID.userProfile.salutation"
                    ></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 mr-3>
                    <v-text-field
                            solo
                            readonly
                            label="Organisation"
                            :value="getOrganizerByID.organizerProfile.name"
                    ></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 mr-3>
                    <v-text-field
                            solo
                            readonly
                            label="Phone"
                            :value="getOrganizerByID.userProfile.mobileNumber"
                    ></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 mr-3>
                    <v-text-field
                            solo
                            readonly
                            label="E-mail"
                            :value="getOrganizerByID.userProfile.email"
                    ></v-text-field>
                </v-flex>


                <v-btn @click="approveOrganizer">Approve</v-btn>
                <v-btn @click="goToRejectScreen">Reject</v-btn>

            </v-container>
        </template>
    </v-layout>
</template>


<script>
    import {Query_getOrganizerByID} from "../../graphql";
    import {Mutation_approveOrganizer} from "../../graphql";

    export default {
        name: "ApproveOrganiser",
        data() {
            return {
                loaderMessage: "Please stand by",
                id: this.$route.params.approveOrganiserID,
                getOrganizerByID: { organizerProfile: { }, userProfile: { }, uploadId: "" },
                image: "",
                dialog: false
            }
        },
        created() {
            this.$apollo.query({
                query: Query_getOrganizerByID,
                variables: {
                    id: this.id
                },
                fetchPolicy: 'no-cache'
            })
                .then(res => {
                    this.getOrganizerByID = res.data.getOrganizerByID;
                    this.image = res.data.getOrganizerByID.uploadId
                })
        },
        methods: {
            approveOrganizer(){
                this.dialog = true;
                this.$apollo.mutate({
                    mutation: Mutation_approveOrganizer,
                    variables: {
                        id: this.id,
                        organizer: this.getOrganizerByID.organizerProfile.name,
                        email: this.getOrganizerByID.userProfile.email
                    }
                }).then(res =>{
                    if(res.data.approveOrganizer.status){
                        this.loaderMessage = "Organizer Approved!";
                        setTimeout( () => {
                            this.$router.push({name: 'organiser/request-list'})
                        }, 2000)
                    }
                })
            },
            goToRejectScreen(){
                this.$router.push({name:'organiser/reject-organiser',params:{rejectOrganiserID:this.id}})
            }
        }
    }
</script>

<style scoped>

</style>