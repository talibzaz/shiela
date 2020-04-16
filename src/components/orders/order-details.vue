<template>
    <v-container>
        <v-layout>
            <v-flex mb-5 justify-center class="cs-2" style="display: flex">
                Order Details : <span>#125644</span>
            </v-flex>
        </v-layout>
        <v-container shadow mb-5>
            <v-layout pb-5 pt-2>
                <v-flex md6>
                    <span class="bold-font cs-3">Name :</span> <span class="normal-font cs-3">  {{ sale.name}}</span>
                </v-flex>
                <v-flex md6>
                    <span class="bold-font cs-3">Email :</span> <span class="normal-font cs-3">  {{ sale.email }}</span>
                </v-flex>
            </v-layout>
            <v-layout pb-3>
                <v-flex md6>
                    <span class="bold-font cs-3">No of Attendees :</span> <span class="normal-font cs-3">  {{ attendeesCount }}</span>
                </v-flex>
                <v-flex md6>
                    <span class="bold-font cs-3">Amount Paid :</span> <span class="normal-font cs-3">  {{ sale.amount_paid }}</span>
                </v-flex>
            </v-layout>
        </v-container>
        <v-flex mb-5 justify-center class="cs-2" style="display: flex">
            Attendee List
        </v-flex>

        <datatable
                :headers="headers"
                :items="attendeeList"
        >
        </datatable>
    </v-container>

</template>

<script>
    import Datatable from '@/components/ui-components/datatable'
    export default {
        name: "OrderDetails",
        props: ['salesID'],
        components:{
            Datatable
        },
        data() {
            return {

                headers: [
                    { text: 'Attendee First Name', value: 'first_name' },
                    { text: 'Attendee Last Name', value: 'last_name'},
                    { text: 'Email', value:'email' },
                    { text: 'Phone', value: 'phone' },
                ],
                sale: this.$route.query.data,
                attendeeList: this.$route.query.data.attendees,
                attendeesCount: 0
            }
        },
        mounted() {
            if (this.$route.query.data.attendees != null) {
                this.attendeesCount = this.$route.query.data.attendees.length
            } else {
                this.attendeeList = []
            }
        }

    }
</script>

<style scoped>
    @import "../../styles/common.css";
    .cs-2{
        font-family: ETProximaNova-bold;
        font-size:20px;
    }
    .cs-3{
        font-size: 18px;
    }
</style>
