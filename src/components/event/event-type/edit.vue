<template>
    <form-control
            showCancel
            title="Edit Event Type"
            :formItems="getEventTypeById"
            @createFunc="executeMutation"
    >

    </form-control>
</template>

<script>
    import FormControl from '@/components/ui-components/form-control';
    import {Query_getEventTypeById} from "../../../graphql";
    import {Mutation_updateEventType} from "../../../graphql";

    export default {
        name: "EditeventType",
        components: {
            FormControl
        },
        data() {
            return {
                getEventTypeById: {},
                id: this.$route.params.eventTypeID
            }
        },
        created() {
            this.$apollo.query({
                query: Query_getEventTypeById,
                variables: {
                    id: this.id
                },
                fetchPolicy: 'no-cache'
            })
                .then(res => {
                    this.getEventTypeById = res.data.getEventTypeById
                })
        },
        methods: {
            executeMutation(name, desc) {
                this.$apollo.mutate({
                    mutation: Mutation_updateEventType,
                    variables: {
                        id: this.id,
                        eventTypeName: name,
                        desc: desc
                    }
                })
                    .then(res => {
                        if(res.data.updateEventType.status) {
                            alert("Updated Successfully!!!")
                        } else {
                            alert("Update Failed!!!")
                        }
                    })
            }
        }
    }

</script>