<template>
    <v-container>
        <v-layout>
            <form-control
                    showCancel
                    title="Edit Job Position"
                    :formItems="getPositionByID"
                    @createFunc="executeMutation"
            >
            </form-control>
        </v-layout>
    </v-container>
</template>

<script>
    import FormControl from '@/components/ui-components/form-control';
    import {Query_getPositionByID} from "../../../graphql";
    import {Mutation_updateJobPositionById} from "../../../graphql";

    export default {
        name: 'EditJobPositions',
        components: {
            FormControl
        },
        data() {
            return {
                getPositionByID: {},
                id: this.$route.params.positionID
            }
        },
        created(){
            this.$apollo.query({
                query: Query_getPositionByID,
                variables: {
                    id: this.id
                },
                fetchPolicy: 'no-cache'
            })
                .then(res => {
                    this.getPositionByID = res.data.getPositionByID;
                })
        },
        methods: {
            executeMutation(name, desc) {
                this.$apollo.mutate({
                    mutation: Mutation_updateJobPositionById,
                    variables: {
                        id: this.id,
                        name: name,
                        desc: desc
                    }
                }).then(res => {
                    if(res.data.updateJobPositionById.status) {
                        alert("Updated Successfully!!!")
                    } else {
                        alert("Update Failed!!")
                    }
                })
            }
        }
    }
</script>

<style>
    @import "../../../styles/common.css";
</style>