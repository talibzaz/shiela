<template>
    <form-control
            title="Edit Category"
            imageUpload
            showCancel
            setImageSize
            customUploadButton
            :formItems="getCategoryById"
            @createFunc="executeMutation"
    >

    </form-control>
</template>

<script>
    import FormControl from '@/components/ui-components/form-control';
    import { GET_CATEGORY_BY_ID_QUERY } from '../../../graphql'
    import { EDIT_CATEGORY_MUTATION } from '../../../graphql'

    export default {
        name: "edit",
        components:{
            FormControl
        },
        data() {
            return {
                getCategoryById :{},
                id: this.$route.params.categoryID

            }
        },
        created(){
            this.$apollo.query({
                query: GET_CATEGORY_BY_ID_QUERY,
                variables: {
                    id: this.id
                },
                fetchPolicy: 'no-cache'
            }).then(res => {
                this.getCategoryById = res.data.getCategoryById
            })
        },
        methods: {
            executeMutation(name, desc, imageData, imageSize) {
                this.$apollo.mutate({
                    mutation: EDIT_CATEGORY_MUTATION,
                    variables: {
                        id: this.id,
                        newName: name,
                        newDescription: desc,
                        imageSize: imageSize,
                        imageData: imageData,
                    }
                }).then(response => {
                        if(response.data.editCategory.status){
                            alert("Updated Successfully!!")
                        } else {
                            alert("Update Failed!!!")
                        }
                })
            }
        }
    }
</script>

<style scoped>

</style>
