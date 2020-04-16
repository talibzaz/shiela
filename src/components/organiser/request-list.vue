<template>
    <v-container>
        <v-layout>
            <v-flex mb-3 class="bold-font titles">Pending List</v-flex>
        </v-layout>
        <v-layout>
    <datatable
            :headers="headers"
            :items="organizerProfileList"
            :showAction="showAction"
            :page="page"
            :button="button"
            :loading="loading"
            @onAction="goToApproveScreen"
            @getNextItems="executeQuery"
    >
    </datatable>
        </v-layout>
    </v-container>
</template>

<script>
    import Datatable from '@/components/ui-components/datatable'
    import {Query_organizerProfileList} from '../../graphql.js'


    export default {
        name: "RequestList",
        components:{
            Datatable
        },
        data () {
            return {
                headers: [
                    { text: 'Organiser Name', value: 'name' },
                    { text: 'Website', value: 'website' },
                    { text: 'User', value: 'userFirstName' },
                    { text: 'Status', value: 'status' },
                ],
                button: "Approve / Reject",
                showAction: true,
                page: 1,
                loading: true,
                organizerProfileList:[]
            }
        },
        watch: {
            organizerProfileList: function (val) {
                if (val != null) {
                    this.loading = false;
                }
            }
        },
        methods:{
            executeQuery(page) {
                this.loading = true;
                this.$apollo.query({
                    query: Query_organizerProfileList,
                    variables: {
                        status: "PENDING",
                        offset: page-1
                    }
                })
                    .then(res => {
                        this.organizerProfileList = res.data.organizerProfileList;
                        this.page = page;
                    })
            },
            goToApproveScreen(approveOrganiser){
                this.$router.push({name:'organiser/approve-organiser', params: {approveOrganiserID: approveOrganiser.id}})
            }
        },
        apollo: {
            organizerProfileList: {
                query: Query_organizerProfileList,
                variables: {
                    status: "PENDING",
                    offset: 0,
                },
                fetchPolicy: 'no-cache'
            }
        },

    }
</script>

<style scoped>
    @import "../../styles/common.css";

</style>
