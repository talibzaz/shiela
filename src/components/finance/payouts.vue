<template>
    <v-container>
        <v-layout>
            <v-flex mb-3  class="bold-font titles">Payouts (In USD)</v-flex>
        </v-layout>
        <v-layout>
            <v-dialog v-model="dialog" max-width="500px">
                <v-card>
                    <v-card-title>
                        <span class="headline">CONFIRMATION</span>
                    </v-card-title>

                    <v-card-text>Are you sure you want to mark this event as Paid?</v-card-text>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="green darken-1" flat @click.native="close">CANCEL</v-btn>
                        <v-btn color="green darken-1" flat @click.native="confirmMarkAsPaid">YES</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            <template>
                <div>
                    <v-data-table
                            :loading="loading"
                            :headers="headers"
                            :items="getPayoutDetails"
                            :pagination.sync="pagination"
                            hide-actions
                            class="elevation-1"
                    >
                        <v-progress-linear slot="progress" color="info" height="5" indeterminate></v-progress-linear>

                        <template slot="items" slot-scope="props">
                            <td>{{ props.item.name }}</td>
                            <td class="text-xs-right">{{ props.item.endDate }}</td>
                            <td class="text-xs-right">{{ props.item.sold }}</td>
                            <td class="text-xs-right">{{ props.item.totalSaleAmount }}</td>
                            <td class="text-xs-right">{{ props.item.totalTaxAmount }}</td>
                            <td class="text-xs-right">{{ props.item.totalEtShare }}</td>
                            <td class="text-xs-right">{{ props.item.totalPayoutAmount }}</td>
                            <td>
                                <v-btn slot="activator" :style="customFont" :disabled="props.item.status == 'PAID'" @click="generatePopUp(props.item.id)">{{props.item.status}}</v-btn>
                            </td>
                        </template>
                    </v-data-table>
                    <div class="text-xs-center pt-2">
                        <v-pagination :length="pages" :value="page" @input="executeQuery"></v-pagination>
                    </div>
                </div>
            </template>
        </v-layout>
    </v-container>
</template>

<script>
    import Datatable from '../ui-components/datatable';
    import {Query_getPayoutDetails} from "../../graphql";
    import {Mutation_markAsPaidByEventId} from "../../graphql";

    export default {
        name: "Payouts",
        components: {
        },
        data() {
            return {
                page: 1,
                dialog: false,
                loading: true,
                itemEventId: "",
                showAction: true,
                getPayoutDetails: [],
                pagination: {
                    rowsPerPage: 10,
                    sortBy: '',
                },
                customFont: {
                    'font-size': '14px',
                    'font-family': 'ETProximaNova-regular'
                },
                headers: [
                    {text: "Name", value: "name"},
                    {text: "End Date", value: "endDate"},
                    {text: "Tickets Sold", value: "sold"},
                    {text: "Sale Amount", value: "totalSaleAmount"},
                    {text: "Tax Amount", value: "totalSaxAmount"},
                    {text: "ET Share", value: "totalEtShare"},
                    {text: "Payout Amount", value:"totalPayoutAmount"},
                    {text: "Status", value:"status"}
                ]
            }
        },
        created() {
            this.$apollo.query({
                query: Query_getPayoutDetails,
                variables: {
                    offset: 0
                }
            }).then(res => {
                this.pagination.totalItems = res.data.getPayoutDetails.length;
                this.getPayoutDetails = res.data.getPayoutDetails;
                this.loading = false
            })
        },
        watch: {
            getPayoutDetails: function (val) {
                if (val != null) {
                    this.loading = false;
                }
            }
        },
        methods: {
            generatePopUp(item){
                this.itemEventId = item;
                this.dialog = true;
            },
            close () {
                this.dialog = false;
            },
            executeQuery(page) {
                this.loading = true;
                this.$apollo.query({
                    query: Query_getPayoutDetails,
                    variables: {
                        offset: page-1
                    }
                }).then(res => {
                        this.pagination.totalItems = res.data.getPayoutDetails.length;
                        this.getPayoutDetails = res.data.getPayoutDetails;
                        this.page = page;
                    });
            },
            confirmMarkAsPaid() {
                //gql mutation query to set data as mark as paid.
                this.$apollo.mutate({
                    mutation: Mutation_markAsPaidByEventId,
                    variables: {
                        eventId: this.itemEventId
                    }
                }).then(res => {
                    this.itemEventId = "";
                    this.$router.go(this.$router.currentRoute)
                })
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

</style>
