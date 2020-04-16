<template>
    <v-container>
        <v-layout>
            <v-flex>
                <form-control
                        title="Regions"
                        subtitle = "Create new Region"
                        descriptionField
                        @createFunc="executeMutation"
                >
                </form-control>
            </v-flex>
        </v-layout>

        <v-flex mb-3 justify-center class="cs-2 bold-font titles" style="display: flex">
            Region List
        </v-flex>
        <v-layout>
            <v-flex>
                <datatable
                        :page="page"
                        :headers="headers"
                        :loading="loading"
                        :items="listRegions"
                        :showAction="showAction"
                        @onAction="editRegion"
                        @getNextItems="executeQuery"
                >
                </datatable>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import FormControl from '@/components/ui-components/form-control';
    import Datatable from '@/components/ui-components/datatable'
    import {Query_listRegions} from "../../graphql";
    import { Mutation_createNewRegion } from "../../graphql.js";

    export default {
        name: "Regions",
        components:{
            Datatable,
            FormControl
        },
        data () {
            return {
                page: 1,
                name: '',
                loading: true,
                showAction: true,
                listRegions: [],
                headers: [
                    { text: 'Name', value: 'name' },
                    { text: 'No Of Events', value:'noOfEvents' },
                ],
            }
        },
        watch: {
            listRegions: function (val) {
                if (val != null) {
                    this.loading = false;
                }
            }
        },
        methods: {
            editRegion(region){
                this.$router.push({name:'regions/edit', params:{regionID: region.id}})
            },
            executeQuery(page){
                this.loading = true;
                this.$apollo.query({
                    query: Query_listRegions,
                    variables: {
                        offset: page-1
                    }
                })
                    .then(res => {
                        this.page = page;
                        this.listRegions = res.data.listRegions;
                    })
            },
            executeMutation(name) {
                var region = name.charAt(0).toUpperCase() + name.slice(1);

                this.$apollo
                    .mutate({
                        mutation: Mutation_createNewRegion,
                        variables: {
                            name: region,
                        }
                    })
                    .then(res => {
                        if(res.data.createNewRegion.status){
                            this.$router.go(this.$route.currentRoute);
                        } else {
                            console.log("error while creating new interest")
                        }
                    })
            }
        },
        apollo: {
            listRegions: {
                query: Query_listRegions,
                variables: 0
            },
            fetchPolicy: 'no-cache'
        }
    }
</script>

<style scoped>
    @import "../../styles/common.css";
</style>