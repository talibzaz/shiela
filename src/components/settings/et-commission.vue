<template>
    <v-container>
        <v-flex d-flex justify-center mb-3 class="bold-font titles"> Eventackle Commission</v-flex>
        <v-layout elevation-2 pt-4 pb-4 pl-4 pr-4>
            <v-flex>
                <div style="margin-bottom: 10px" class="cs-6 bold-font">Eventackle Share (Currently {{currentShare}}%)</div>
                <v-form ref="form" v-model="valid" lazy-validation>
                    <v-text-field
                            solo
                            label="Update Global Et Share"
                            type="number"
                            :rules="etRules"
                            v-model="etShare"
                    ></v-text-field>
                </v-form>

            </v-flex>
        </v-layout>
        <v-layout>
            <v-flex style="display: flex;justify-content: center;margin-top: 30px">
                <v-btn class="bold-font" @click="updateEtShare">Update</v-btn>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import {Query_GetGlobalEtCommissionRate, Mutation_UpdateGlobalEtCommissionRate} from "../../graphql";

    export default {
        name: "EtCommission",
        data() {
            return {
                valid: false,
                etShare: 0,
                currentShare: 0,
                etRules: [
                    v => (v && v.length <=6 ) || 'Incorrect Value',
                    v => !/-/.test(v) || 'Must be valid number'
                ]
            }
        },
        created() {
            this.$apollo.query({
                query: Query_GetGlobalEtCommissionRate
            }).then(res => {
                this.currentShare = res.data.getGlobalEtCommissionRate
                this.$refs.form.reset();
            })
        },
        methods: {
            updateEtShare() {
                if(this.$refs.form.validate()){
                    let etCommission = this.etShare;

                    this.$apollo.mutate({
                        mutation: Mutation_UpdateGlobalEtCommissionRate,
                        variables: {
                            etCommission: etCommission
                        }
                    }).then(res => {
                        if(res.data.updateGlobalEtCommissionRate.status) {
                            alert("Commission Rate updated!!!")
                        } else {
                            alert(res.data.updateGlobalEtCommissionRate.message)
                        }
                    })
                }
            }
        }
    }
</script>