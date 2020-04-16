<template>
  <v-container>
    <v-layout>
      <v-flex>
        <form-control title="Job / Position" subtitle="Create new Job / Position" @createFunc="executeMutation"></form-control>
      </v-flex>
    </v-layout>
    <v-flex mb-3 d-flex justify-center class="bold-font titles">Job/Position List</v-flex>
    <v-layout>
      <v-flex>
        <datatable
                :headers="headers"
                :button="button"
                :items="listPositions"
                :page="page"
                :showAction="showAction"
                :loading="loading"
                @getNextItems="executeQuery"
                @onAction="editPosition"
        >
        </datatable>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
    import FormControl from '@/components/ui-components/form-control';
    import Datatable from "../../ui-components/datatable";
    import { Query_listPositions } from "../../../graphql";
    import {Mutation_createNewJobPosition} from '../../../graphql.js';
    export default {
        name: "JobPosition",
        components:{
            FormControl,
            Datatable
        },
        data(){
            return {
                name: '',
                desc: '',
                page: 1,
                showAction: true,
                button:"Edit",
                loading: true,
                headers: [
                    { text: 'Name', value: 'name' },
                    { text: 'No Of Events', value:'noOfEvents' },
                ],
                listPositions: []
            }
        },
        watch: {
            listPositions: function (val) {
                if (val != null) {
                    this.loading = false;
                }
            }
        },
        methods: {
            editPosition(position) {
                this.$router.push({name:'event/job-position/edit', params:{positionID: position.id}})
            },
            executeQuery(page) {
                this.loading = true
                this.$apollo.query({
                    query: Query_listPositions,
                    variables: {
                        offset: page - 1
                    }
                })
                    .then(res => {
                        this.listPositions = res.data.listPositions;
                        this.page = page;
                    })
            },
            executeMutation(name, desc) {
                var position = name.charAt(0).toUpperCase() + name.slice(1);
                this.$apollo
                    .mutate({
                        mutation: Mutation_createNewJobPosition,
                        variables: {
                            name: position,
                            desc: desc,
                        }
                    })
                    .then(response => {
                        if(response.data.createNewJobPosition.status == true) {
                            this.$router.go()
                        } else {
                            console.log("error in creating job / position")
                        }
                    })
            }
        },
        apollo: {
            listPositions: {
                query: Query_listPositions,
                variables: {
                    offset: 0
                },
                fetchPolicy: 'no-cache'
            }
        }
    }
</script>

<style scoped>
  @import "../../../styles/common.css";

</style>
