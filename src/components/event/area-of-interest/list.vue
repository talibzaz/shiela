<template>
    <v-container>
        <v-layout>
            <v-flex>
                <form-control
                        title="Area of interest"
                        subtitle = "Create new area of interest"
                        @createFunc="executeMutation"
                >
                </form-control>
            </v-flex>
        </v-layout>

        <v-flex mb-3 justify-center class="cs-2" style="display: flex">
            List Of Interests
        </v-flex>
        <v-layout>
            <v-flex>
            <datatable
                    :page="page"
                    :button="button"
                    :headers="headers"
                    :loading="loading"
                    :items="listOfInterests"
                    :showAction="showAction"
                    @onAction="editInterests"
                    @getNextItems="executeQuery"
            >
            </datatable>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import FormControl from '@/components/ui-components/form-control'
    import Datatable from "../../ui-components/datatable";
    import { Mutation_createAreaOfInterest } from '../../../graphql.js'
    import { Query_listOfInterests } from '../../../graphql.js'

    export default {
        name: "AreaOfInterest",
        components: {
            Datatable,
            FormControl
        },
        props:['customSelect'],
        data(){
            return {
                page: 1,
                name: '',
                desc: '',
                showAction: true,
                headers: [
                    { text: 'Name', value: 'name' },
                    { text: 'No Of Events', value:'noOfEvents' },
                ],
                button: "Edit",
                listOfInterests: [],
                loading: true
            }
        },
        beforeRouteEnter (to, from, next) {
            if (from.name === 'event/area-of-interest/edit') {
                console.log("in beforeRouteEnter");
            }
            next();
        },
        watch: {
            listOfInterests: function (val) {
                if (val != null) {
                    this.loading = false;
                }
            }
        },
        methods: {
            editInterests(interest){
                this.$router.push({name:'event/area-of-interest/edit', params:{interestID: interest.id}})
            },
            executeQuery(page){
                this.loading = true;
                this.$apollo.query({
                    query: Query_listOfInterests,
                    variables: {
                        offset: page-1
                    }
                })
                    .then(res => {
                        this.page = page;
                        this.listOfInterests = res.data.listOfInterests;
                    })
            },
            executeMutation(name, desc) {
                var interest = name.charAt(0).toUpperCase() + name.slice(1);
                this.$apollo
                    .mutate({
                        mutation: Mutation_createAreaOfInterest,
                        variables: {
                            name: interest,
                            desc: desc,
                        }
                    }).then(response => {
                        if(response.data.createAreaOfInterest.status){
                            this.$router.go();
                        } else {
                            console.log("error while creating new interest")
                        }
                    })
            }
        },
        apollo: {
            listOfInterests: {
                query: Query_listOfInterests,
                variables: {
                    offset: 0
                },
                fetchPolicy: 'no-cache'
            }
        }
    }


</script>

<style scoped>

    @font-face {
        font-family: ETProximaNova-bold;
        src: url(../../../fonts/proximanova-bold-webfont.woff);
    }
    @font-face {
        font-family: ETProximaNova-regular;
        src: url(../../../fonts/proximanova-regular-webfont.woff);
    }

    .cs-2{
        font-family: ETProximaNova-bold;
        font-size:20px;
    }
</style>

