<template>
    <v-container>
        <v-layout>
    <v-flex>
        <form-control
                setImageSize
                customUploadButton
                title="Event Category"
                subtitle="Create new category"
                @createFunc="executeMutation"
        >
        </form-control>
    </v-flex>
        </v-layout>
        <v-layout>
            <v-flex md-3 d-flex justify-center class="bold-font titles">Event Category List</v-flex>
        </v-layout>
        <data-table
                :headers="headers"
                :button="button"
                :items="getCategories"
                :showAction="showAction"
                @getNextItems="executeQuery"
                :page="page"
                @onAction="editCategory"
                :loading="loading"
        >
        </data-table>
        </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import FormControl from '@/components/ui-components/form-control'
    import DataTable from '@/components/ui-components/datatable'
    import { GET_ALL_CATEGORIES_QUERY } from '../../../graphql.js'
    import { CREATE_CATEGORY_MUTATION } from '../../../graphql.js'

    export default {
        name: "categories",
        components: {
            FormControl,
            DataTable
        },
        data () {
            return {
                headers: [
                    { text: 'Name', value: 'name' },
                    { text: 'No. Of Events ', value:'noOfEvents' },

                ],
                button:"Edit",
                showAction: true,
                getCategories: [],
                name: '',
                description: '',
                imageData: '',
                page : 1,
                loading:true
            }
        },
        watch: {
            getCategories: function (val) {
                if (val != null) {
                    this.loading = false;
                }
            }
        },
        apollo: {
            getCategories: {
                query: GET_ALL_CATEGORIES_QUERY,
                variables: {
                    offset: 0
                },
                fetchPolicy: 'no-cache'
            }
        },
        methods: {
            executeMutation(name, desc, imageData) {
                this.$apollo
                    .mutate({
                        mutation: CREATE_CATEGORY_MUTATION,
                        variables: {
                            name: name,
                            description: desc,
                            imageSize: "1*1",
                            imageData: imageData
                        }
                    }).then(response => {
                    if(response.data.createCategory.status){
                        this.$router.go();
                    } else {
                        alert("error while creating new Category")
                    }
                })
            },
            executeQuery(page) {
                this.loading = true;
                this.$apollo.query({
                    query: GET_ALL_CATEGORIES_QUERY,
                    variables: {
                        offset: page-1
                    }
                })
                    .then(response => {
                        this.getCategories = response.data.getCategories;
                        this.page = page;
                    })
            },
            editCategory(category) {
                this.$router.push({name:'event/categories/edit', params:{categoryID: category.id}})
            }
        },
    }
</script>

<style scoped>
    @import "../../../styles/common.css";

</style>
