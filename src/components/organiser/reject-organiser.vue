<template>
    <v-layout>
        <v-dialog v-model="dialog" max-width="500px">
            <v-card>
                <v-card-title>
                    <span class="headline">ORGANIZER REJECTED</span>
                </v-card-title>

                <v-card-text>You have rejected the organizer.</v-card-text>
            </v-card>
        </v-dialog>
        <template>
            <v-container>
                <v-flex mb-3 class="bold-font cs-7">Reject Organiser Profile</v-flex>
                <v-container elevation-2>
                    <v-layout>
                        <v-flex>
                            <v-select
                                    solo
                                    :items="items"
                                    v-model="reason"
                                    label="Choose">
                            </v-select>
                        </v-flex>
                    </v-layout>
                    <v-layout>
                        <v-flex>
                            <v-textarea
                                    v-if="reason === 'Other'"
                                    solo
                                    label="Description *"
                                    v-model="description"
                                    auto-grow
                                    required
                            ></v-textarea>
                        </v-flex>
                    </v-layout>
                    <v-layout>
                        <v-flex style="display: flex;justify-content: flex-end"><v-btn class="bold-font" :disabled="reason === ''" @click="rejectOrganizer">Save</v-btn>
                            <v-btn class="bold-font" @click="cancel">Cancel</v-btn></v-flex>
                    </v-layout>
                </v-container>
            </v-container>
        </template>
    </v-layout>
</template>


<script>
    import {Mutation_rejectOrganizerByID} from "../../graphql";

    export default {
        name: "RejectOrganiser",
        data() {
            return {
                dialog: false,
                reason: "",
                description: "",
                items: ["Reason 1", "Reason 2", "Reason 3", "Other"],
                id: this.$route.params.rejectOrganiserID
            }
        },
        methods: {
            rejectOrganizer() {
                this.$apollo.mutate({
                    mutation: Mutation_rejectOrganizerByID,
                    variables: {
                        id: this.id,
                        reason: this.reason,
                        desc: this.description
                    }
                }).then(res => {
                    if (res.data.rejectOrganizerByID.status){
                        this.dialog = true;
                        setTimeout( () => {
                            this.$router.push({name: 'organiser/request-list'})
                        }, 1300)
                    }
                })
            },
            cancel() {
               this.$router.go(-1)
            }
        }

    }
</script>

<style scoped>
    @import "../../styles/common.css";
    .cs-7{
        font-size: 20px;
    }

</style>