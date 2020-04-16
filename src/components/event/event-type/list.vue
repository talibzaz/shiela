<template>
    <v-container>
        <v-layout>
            <v-flex>
                <form-control title="Event Type" subtitle="Create new event type" @createFunc="executeMutation"></form-control>
            </v-flex>
        </v-layout>

        <v-layout>
            <v-flex d-flex justify-center class="bold-font titles">
                Event Type List
            </v-flex>
        </v-layout>
        <datatable
                :headers="headers"
                :button="button"
                :items="listEventTypes"
                :showAction="showAction"
                :page="page"
                :loading="loading"
                @getNextItems="executeQuery"
                @onAction="editEventType"
        >
        </datatable>
    </v-container>
</template>

<script>
    import FormControl from '@/components/ui-components/form-control';
    import Datatable from "../../ui-components/datatable";
    import { Query_listEventTypes } from '../../../graphql.js';
    import { Mutation_createNewEventType} from "../../../graphql";

    export default {
        name: "EventType",
        components: {
            FormControl,
            Datatable
        },
        data() {
            return {
                name: '',
                desc: '',
                page: 1,
                showAction: true,
                button:"Edit",
                headers: [
                    { text: 'Name', value: 'name' },
                    { text: 'No Of Events', value:'noOfEvents' },
                ],
                listEventTypes: [],
                loading: true
            }
        },
        watch: {
            listEventTypes: function (val) {
                if (val != null) {
                    this.loading = false;
                }
            }
        },
        methods: {
            editEventType(eventType){
                this.$router.push({name: "event/event-type/edit", params: {eventTypeID: eventType.id}})
            },
            executeQuery(page){
                this.loading = true
                this.$apollo.query({
                    query: Query_listEventTypes,
                    variables: {
                        offset: page - 1
                    }
                })
                    .then(res => {
                        this.listEventTypes = res.data.listEventTypes;
                        this.page = page;
                    })
            },
            executeMutation(name, desc) {
                var eType = name.charAt(0).toUpperCase() + name.slice(1);
                this.$apollo
                    .mutate({
                        mutation: Mutation_createNewEventType,
                        variables: {
                            eventTypeName: eType,
                            desc: desc,
                        }
                    })
                    .then(response => {
                        if(response.data.createNewEventType.status == true){
                            this.$router.go();
                        } else {
                            console.log("error while creating new event type")
                        }
                    })
            }
        },
        apollo: {
            listEventTypes: {
                query: Query_listEventTypes,
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
