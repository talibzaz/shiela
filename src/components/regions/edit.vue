<template>
    <v-container>
        <v-layout>
            <v-flex>
    <form-control
            title="Edit Region"
            showCancel
            :formItems="getRegionByID"
            @createFunc="executeMutation"
    ></form-control>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import FormControl from '@/components/ui-components/form-control';
    import {Mutation_updateRegionByID} from "../../graphql";
    import {Query_getRegionByID} from "../../graphql";

    export default {
        name: "EditRegion",
        components: {
            FormControl
        },
        data() {
            return {
                getRegionByID: {},
                id: this.$route.params.regionID
            }
        },
        created() {
          this.$apollo.query({
              query: Query_getRegionByID,
              variables: {
                  id: this.id
              },
              fetchPolicy: 'no-cache'
          }).then(res => {
              this.getRegionByID = res.data.getRegionByID;
          })
        },
        methods: {
            executeMutation(name) {
                this.$apollo.mutate({
                    mutation: Mutation_updateRegionByID,
                    variables: {
                        id: this.id,
                        name: name,
                    }
                }).then(res => {
                    alert(res.data.updateRegionByID.message);
                })
            }
        }
    }
</script>