<template>
    <v-container>
        <v-layout>
            <v-flex mb-3 class="bold-font titles">Sales for this Event</v-flex>
        </v-layout>
            <v-layout>
                <v-flex>
    <datatable
            :headers="headers"
            :items="list"
            :showAction="showAction"
            @onAction="goToOrderDetails"
            :page="page"
            :loading="loading"
    >
    </datatable>
                </v-flex>
            </v-layout>
    </v-container>
</template>

<script>
    import Datatable from '@/components/ui-components/datatable'
    import OrderDetails from '@/components/orders/order-details'
    import axios from "axios";

    export default {
        name: "OrderSales",
        props: ['eventID'],
        components:{
            Datatable,
            OrderDetails
        },
        data () {
            return {
                headers: [
                    { text: 'Purchased On', value:'purchased_on'},
                    { text: 'Order No',value:'order_number'},
                    { text: 'Name',value:'name'},
                    { text: 'Attendees',value:'total_tickets' }
                ],
                showAction: true,
                list: [],
                page : 1,
                loading:true
            }
        },
        watch: {
            list: function (val) {
                if (val != null) {
                    this.loading = false;
                }
            }
        },
        mounted (){
            const params = new URLSearchParams();
            params.append("event_id", this.eventID);
            axios.post("https://injun.eventackle.com/get-sales", params, { headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }}).then(response => {
                if (response.data.status === "OK") {
                    console.log(response.data);
                    this.list = response.data.sales;
                }

            });
        },
        methods:{
            goToOrderDetails(sale){
                this.$router.push({name:'orders/order-details', query: { data: sale }, params:{ salesID: sale.order_number}});
            },
        },
    }
</script>
<style>
    @import "../../styles/common.css";

</style>
