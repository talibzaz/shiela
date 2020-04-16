<template>
    <v-container>
        <v-layout>
            <v-flex>
                <form-control
                        title="Edit Area Of Interest"
                        showCancel
                        :formItems="getInterestByID"
                        @createFunc="executeMutation"
                >
                </form-control>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import FormControl from '@/components/ui-components/form-control';
    import {Query_getInterestByID} from '../../../graphql';
    import {Mutation_updateAreaOfInterest} from "../../../graphql";

    export default {
        name: "EditAreaOfInterest",
        components:{
            FormControl
        },
        data() {
            return {
                getInterestByID:{},
                id: this.$route.params.interestID
            }
        },
        created(){
            this.$apollo.query({
                query: Query_getInterestByID,
                variables: {
                    id: this.id
                },
                fetchPolicy: 'no-cache'
            }).then(res => {
                this.getInterestByID = res.data.getInterestByID
            })
        },
        methods: {
            executeMutation(name, desc) {
                this.$apollo.mutate({
                    mutation: Mutation_updateAreaOfInterest,
                    variables: {
                        id: this.id,
                        name: name,
                        desc: desc
                    },
                    update: (store, {data: {res}}) => {
                        console.log("store: ", store);
                        console.log("res: ", res);
                    }
                })
                .then(res => {
                    if(res.data.updateAreaOfInterest.status) {
                        alert("yes")
                        this.$router.push({name:"event/area-of-interest/list"})
                    } else {
                        alert("Update failed!!")
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>