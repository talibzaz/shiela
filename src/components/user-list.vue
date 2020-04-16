<template>
    <v-container>
        <v-layout>
            <v-flex mb-3 class="titles bold-font">User List</v-flex>
        </v-layout>
        <v-layout>
            <v-flex>
                <datatable
                        :headers="headers"
                        :items="getUserList"
                        :page="page"
                        :showAction="showAction"
                        :loading="loading"
                        @getNextItems="executeQuery"
                >
                </datatable>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import Datatable from './ui-components/datatable';
    import {Query_getUserList} from "../graphql.js";

    export default {
        name: "UserList",
        components: {
            Datatable
        },
        data() {
            return {
                headers: [
                    {text: "Name", value: "userName"},
                    {text: "Email", value: "email"},
                    {text: "Organization", value: "organization"},
                    {text: "Location", value: "location"},
                    {text: "Is Organizer", value: "isOrganizer"}
                ],
                showAction: false,
                page: 1,
                loading:true,
                getUserList: []
            }
        },
        watch: {
            getUserList: function (val) {
                if (val != null) {
                    this.loading = false;
                }
            }
        },
        methods: {
            executeQuery(page) {
                this.loading = true;
                this.$apollo.query({
                    query: Query_getUserList,
                    variables: {
                        offset: page - 1
                    }
                })
                    .then(res => {
                        this.getUserList = res.data.getUserList;
                        this.page = page;
                    });
            }
        },
        apollo: {
            getUserList: {
                query: Query_getUserList,
                variables: {
                    offset: 0
                }
            }
        }
    }
</script>