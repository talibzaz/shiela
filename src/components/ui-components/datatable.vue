<template>
    <div>
        <v-data-table
                :page="page"
                :items="items"
                :loading="loading"
                :headers="headersWithAction"
                :pagination.sync="pagination"
                hide-actions
                class="elevation-1"
        >
            <v-progress-linear slot="progress" color="info" height="5" indeterminate></v-progress-linear>

            <template slot="items" slot-scope="props">
                <td :style="customFont" v-for="header in headers">
                    {{props.item[header.value]}}
                </td>
                <td>
                    <v-btn :style="customFont" v-if="showAction" @click="onAction(props.item)">{{button}}</v-btn>
                </td>
            </template>
        </v-data-table>
        <div class="text-xs-center pt-2">
            <v-pagination :length="pages" :value="page" @input="next"></v-pagination>
        </div>
    </div>
</template>
<script>
    export default {
        name: "Datatable",
        data() {
            return {
                pagination: {
                    rowsPerPage: 10,
                    sortBy: '',
                },
                customFont: {
                    'font-size': '14px',
                    'font-family': 'ETProximaNova-regular'
                }
            }
        },
        // props: ['headers', 'items', 'showAction', 'page', 'loading', 'button'],
        props: {
            headers: {
                type: Array
            },
            items: {
                type: Array
            },
            showAction: {
                type: Boolean
            },
            page: {
                type: Number
            },
            loading: {
                type: Boolean
            },
            button: {
                type: String,
                default: "View"
            },
        },
        methods: {
            onAction(item) {
                this.$emit('onAction', item);
            },
            next(page) {
                this.$emit('getNextItems', page);
            }
        },
        watch: {
            items: function(val) {
                this.pagination.totalItems = val.length;
            },
            status: function(val) {
                console.log(val)
            }
        },
        computed: {
            headersWithAction() {
                return this.showAction ? [...this.headers, {text: 'Action', value: false}] : this.headers;
            },
            pages() {
                if (this.pagination.totalItems / this.pagination.rowsPerPage > 1) {
                    return this.page+1
                } else {
                    return this.page
                }
            }
        }
    }
</script>

<style>
    @import "../../styles/common.css";

</style>
