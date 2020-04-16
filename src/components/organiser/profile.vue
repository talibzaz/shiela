<template>
    <div>
        <template>
            <v-container>
                <v-layout d-flex align-center>
                    <v-flex md9 ml-4 class="bold-font" style="font-size: 24px">Organiser Profile</v-flex>
                    <v-flex md3 style="">
                        <v-switch
                                readonly
                                v-model="isActive"
                                :label="`Inactive / Active`"
                        ></v-switch>
                    </v-flex>
                </v-layout>
                <v-container>
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <v-layout elevation-2 pt-4 pb-4 pl-4 pr-4 mb-3>
                            <v-flex md8 mr-3>
                                <v-layout>
                                    <v-text-field
                                            solo
                                            readonly
                                            label="Name"
                                            v-model="name"
                                    ></v-text-field>
                                </v-layout>
                                <v-textarea
                                        solo
                                        required
                                        auto-grow
                                        label="Description"
                                        v-model="description"
                                ></v-textarea>
                                <v-text-field
                                        solo
                                        label="Website"
                                        v-model="website"
                                ></v-text-field>
                            </v-flex>
                            <v-layout>
                                <v-flex mr-3>
                                    <img class="img-style" :src="image" alt="image not available">
                                </v-flex>
                            </v-layout>
                        </v-layout>
                        <v-flex  mb-3 style="font-size: 24px" class="bold-font">Contact Details</v-flex>

                        <v-flex elevation-2>
                            <v-layout >
                                <v-flex md8 pt-4 pb-4 pl-4 pr-4>
                                    <v-text-field
                                            solo
                                            label="Name"
                                            v-model="userName"
                                    ></v-text-field>
                                    <v-text-field
                                            solo
                                            label="Position"
                                            v-model="salutation"
                                    ></v-text-field>
                                    <v-text-field
                                            solo
                                            readonly
                                            label="Organisation"
                                            v-model="name"
                                    ></v-text-field>
                                    <v-text-field
                                            solo
                                            label="Phone"
                                            v-model="mobileNumber"
                                    ></v-text-field>
                                </v-flex>
                            </v-layout>

                            <v-layout pt-4 pb-4 pl-4 pr-4>
                                <v-flex mr-3>
                                    <v-text-field
                                            solo
                                            label="E-mail"
                                            v-model="email"
                                    ></v-text-field>
                                </v-flex>
                                <v-flex>
                                    <input style="margin-top: 22px;" type="file" accept="application/pdf" @change="convertToBase64">
                                </v-flex>
                                <v-flex>
                                    <iframe :src="agreement" width="310px" height="350px"></iframe>
                                </v-flex>
                            </v-layout>
                            <v-flex>
                                <v-subheader class="bold-font">ET Commission Percentage</v-subheader>
                                <v-label v-if="specific">Currently {{currentEtShare}}%</v-label>
                            </v-flex>
                            <v-layout>

                                <v-checkbox
                                        label="Global"
                                        v-model="global"
                                ></v-checkbox>
                                <v-checkbox
                                        label="Specific"
                                        v-model="specific"
                                ></v-checkbox>
                                <v-flex md9 pt-4 pb-4 pl-4 pr-4>
                                    <v-text-field
                                            solo
                                            type="number"
                                            v-if="specific"
                                            :rules="etRules"
                                            :disabled="!specific"
                                            v-model="etShare"
                                            label="Eventackle Share %"
                                    ></v-text-field>
                                </v-flex>
                            </v-layout>
                            <v-layout pt-4 pb-4 pl-4 pr-4 >
                                <v-textarea
                                        label="INTERNAL EVENTACKLE NOTES"
                                        v-model="etNotes"
                                        auto-grow
                                        required
                                        solo
                                ></v-textarea>
                            </v-layout>
                            <v-layout>
                                <v-flex style="display: flex;justify-content: center;margin-bottom: 10px">
                                    <v-btn
                                            :disabled="updateLoader"
                                            :loading="updateLoader"
                                            class="white--text"
                                            color="blue darken-2"
                                            @click="updateOrganizer"
                                    >
                                        Update
                                    </v-btn>
                                </v-flex>
                                <v-flex v-if="isActive" style="display: flex;justify-content: center;margin-bottom: 10px">
                                    <v-btn

                                            :disabled="deactivateDialog"
                                            :loading="deactivateDialog"
                                            class="white--text"
                                            color="orange darken-2"
                                            @click="deactivateDialog = true"
                                    >
                                        Deactivate
                                    </v-btn>
                                </v-flex>
                                <v-flex v-if="!isActive" style="display: flex;justify-content: center;margin-bottom: 10px">
                                    <v-btn
                                            :disabled="activateDialog"
                                            :loading="activateDialog"
                                            class="white--text"
                                            color="blue darken-2"
                                            @click="activateDialog = true"
                                    >
                                        Activate
                                    </v-btn>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                    </v-form>
                </v-container>
                <v-flex style="font-size: 24px" class="bold-font" ml-4>Organiser Event List</v-flex>
                <v-layout pt-4 pb-4 pl-4 pr-4>
                    <v-flex>
                        <datatable
                                :page="page"
                                :showAction="showAction"
                                :headers="headers"
                                @getNextItems="executeQuery"
                                :items="getOrganizersEventList"
                                :loading="loading"
                        >

                        </datatable>
                    </v-flex>
                </v-layout>
            </v-container>

        </template>

        <template>
            <div class="text-xs-center">
                <v-dialog
                        v-model="updateLoader"
                        hide-overlay
                        persistent
                        width="300"
                >
                    <v-card
                            color="primary"
                            dark
                    >
                        <v-card-text>
                            {{loaderMessage}}
                            <v-progress-linear
                                    v-if="loaderMessage === 'Please stand by'"
                                    indeterminate
                                    color="white"
                                    class="mb-0"
                            ></v-progress-linear>
                        </v-card-text>
                    </v-card>
                </v-dialog>
            </div>
        </template>

        <template>
            <v-dialog
                    v-model="deactivateDialog"
                    max-width="290"
            >
                <v-card>
                    <v-card-title class="headline">Deactivate Organizer!!</v-card-title>

                    <v-card-text>
                        {{deactivateMessage}}
                    </v-card-text>

                    <v-card-actions v-if="buttons">
                        <v-spacer></v-spacer>

                        <v-btn
                                color="green darken-1"
                                flat="flat"
                                @click="deactivateDialog = false"
                        >
                            CANCEL
                        </v-btn>

                        <v-btn
                                color="green darken-1"
                                flat="flat"
                                @click="deactivateOrganizer"
                        >
                            YES
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </template>

        <template>
            <v-dialog
                    v-model="activateDialog"
                    max-width="290"
            >
                <v-card>
                    <v-card-title class="headline">Activate Organizer!</v-card-title>

                    <v-card-text>
                        {{activateMessage}}
                    </v-card-text>

                    <v-card-actions v-if="buttons">
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
                                @click="activateOrganizer"
                        >
                            YES
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </template>

    </div>
</template>


<script>
    import VeeValidate from 'vee-validate';
    import Datatable from '@/components/ui-components/datatable';
    import {Query_getOrganizerByID} from "../../graphql";
    import {Query_getOrganizersEventList} from "../../graphql";
    import {Mutation_updateOrganizer, Mutation_ChangeOrganizersStatus} from "../../graphql";

    export default {
        name: "Profile",
        props:['organiserID','showAction'],
        components:{
            Datatable
        },
        data:function () {
            return{
                page: 1,
                deactivateDialog: false,
                activateDialog: false,
                updateLoader: false,
                loaderMessage: "Please stand by",
                buttons: true,
                deactivateMessage: "Are you sure you want to deactivate this organizer?",
                activateMessage: "Are you sure you want to activate this organizer?",
                loading: true,
                isActive: false,
                valid: false,
                showAction: false,
                getOrganizersEventList: [],
                etRules: [
                    v => (v.length <=6 ) || 'Incorrect Value',
                    v => !/-/.test(v) || 'Must be valid number'
                ],
                id: this.$route.params.organiserID,
                headers: [
                    { text: 'Title', value: 'name' },
                    { text: 'Date', value: 'startDate' },
                    { text: 'City', value: 'venueCity' },
                    { text: 'Status', value: 'status' },
                ],
                name:"",
                image: "",
                userId: "",
                email: "",
                global: true,
                specific: false,
                currentEtShare:'',
                etShare: "",
                etNotes: "",
                website: "",
                userName: "",
                agreement: "",
                salutation: "",
                description: "",
                mobileNumber: "",
                uploadedAgreement: "",
            }
        },
        created() {
            this.$apollo.query({
                query: Query_getOrganizerByID,
                variables: {
                    id: this.id
                },
                fetchPolicy: 'no-cache'
            }).then(res => {
                    this.name = res.data.getOrganizerByID.organizerProfile.name;
                    this.email = res.data.getOrganizerByID.userProfile.email;
                    this.userId = res.data.getOrganizerByID.userProfile.userId;
                    this.isActive = res.data.getOrganizerByID.organizerProfile.isActive;
                    this.userName = res.data.getOrganizerByID.userProfile.userName;
                    this.salutation = res.data.getOrganizerByID.userProfile.salutation;
                    if(res.data.getOrganizerByID.organizerProfile.etCommission != 0) {
                        this.global = false;
                        this.specific = true;
                        this.currentEtShare = res.data.getOrganizerByID.organizerProfile.etCommission;
                    }
                    this.etNotes = res.data.getOrganizerByID.organizerProfile.etNotes;
                    this.description = res.data.getOrganizerByID.organizerProfile.description;
                    this.mobileNumber = res.data.getOrganizerByID.userProfile.mobileNumber;
                    this.website = res.data.getOrganizerByID.organizerProfile.website;
                    this.image = res.data.getOrganizerByID.uploadId;
                    this.agreement = res.data.getOrganizerByID.agreementId;
                });
            this.$apollo.query({
                query: Query_getOrganizersEventList,
                variables:{
                    id: this.id,
                    offset: 0
                },
                fetchPolicy: 'no-cache'
            }).then(res => {
                    this.getOrganizersEventList = res.data.getOrganizersEventList
                });
        },
        methods: {
            convertToBase64(event){
                let file = event.target.files[0];
                let reader = new FileReader();
                let res = "";

                if (file) {
                    reader.readAsDataURL(file);
                }

                reader.addEventListener('load', (res) => {
                    this.uploadedAgreement = res.currentTarget.result;
                    this.agreement = res.currentTarget.result;
                });
            },

            deactivateOrganizer(){
                this.deactivateMessage = "Please wait.....";
                this.buttons = false;
                this.$apollo.mutate({
                    mutation: Mutation_ChangeOrganizersStatus,
                    variables: {
                        organizerId: this.id,
                        status: 0,
                        value: true
                    }
                }).then(res => {
                    this.deactivateMessage = "Organizer Deactivated successfully!!";
                    setTimeout(() => {
                        this.$router.go(-1);
                    }, 2250)
                });
            },
            activateOrganizer(){
                this.activateMessage = "Please wait....";
                this.buttons = false;
                this.$apollo.mutate({
                    mutation: Mutation_ChangeOrganizersStatus,
                    variables: {
                        organizerId: this.id,
                        status: 1,
                        value: false
                    }
                }).then(res => {
                    this.activateMessage = "Organizer Activated Successfully!";
                    setTimeout(() => {
                        this.$router.go(-1)
                    }, 2250);
                });
            },

            updateOrganizer(){
                if(this.$refs.form.validate()) {
                    this.updateLoader = true;
                    let OrgDescription = this.description;
                    let OrgWebsite = this.website;
                    let EtCommission = 0;
                    if(this.specific  && !this.global) {
                        if (this.etShare === '') {
                            EtCommission = this.currentEtShare
                        } else {
                            EtCommission = this.etShare
                        }
                    } else if (this.global && !this.specific) {
                        EtCommission = 0
                    } else {
                        //Prompt user for error message......
                        alert("Please select appropriate et Commission value.");
                        return
                    }

                    let Agreement = this.uploadedAgreement;
                    let OrgID = this.id;
                    let UserName = this.userName.split(" ");
                    let FirstName = UserName[0];
                    let LastName = UserName[1];
                    let Salutation = this.salutation;
                    let Mobile = this.mobileNumber;
                    let Email = this.email;
                    let UserId = this.userId;
                    let EtNotes = this.etNotes;

                    this.$apollo.mutate({
                        mutation: Mutation_updateOrganizer,
                        variables: {
                            description: OrgDescription,
                            website: OrgWebsite,
                            agreement_uid: Agreement,
                            o_id: OrgID,
                            fname: FirstName,
                            lname: LastName,
                            salutation: Salutation,
                            mobile: Mobile,
                            blogUrl: Email,
                            user_id: UserId,
                            etCommission: EtCommission,
                            etNotes: EtNotes
                        }
                    })
                        .then(res => {
                            if(res.data.updateOrganizer.status) {
                                this.loaderMessage = "Organizer updated successfully!!";
                                setTimeout(() => {
                                    this.updateLoader = false;
                                    this.loaderMessage = "Please stand by";
                                    this.$router.go(-1)
                                }, 2250);
                            } else {
                                this.updateLoader = false;
                                alert(res.data.updateOrganizer.message)
                            }
                        })
                }
            },

            executeQuery(page){
                this.loading = true;
                this.$apollo.query({
                    query: Query_getOrganizersEventList,
                    variables: {
                        id: this.id,
                        offset: page - 1
                    }
                })
                    .then(res => {
                        this.page = page;
                        this.getOrganizersEventList = res.data.getOrganizersEventList
                    })
            }
        },
        watch: {
            getOrganizersEventList: function (val) {
                if (val != null) {
                    this.loading = false;
                }
            },
            global: function (val) {
                this.specific = !val
            },
            specific: function(val) {
                this.global = !val
            }
        }
    }

</script>

<style>
    @import "../../styles/common.css";

    .img-style{
        width: 200px;
        height: 200px;
        object-fit: cover;
        object-position: center center;
        border-radius: 4px;
    }
</style>