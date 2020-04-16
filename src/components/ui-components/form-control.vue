<template>
  <v-container >
    <v-flex class="bold-font titles">{{ title }}</v-flex>
    <v-flex elevation-2 pt-4 pb-4 pl-4 pr-4>
    <v-flex class="subtitle text-md-center normal-font">{{ subtitle }}</v-flex>
    <v-layout row wrap>
      <v-flex>
        <v-form ref="form" v-model="valid">
            <v-text-field
                  solo
                  :rules="nameRules"
                  label="Name"
                  v-model="name"
                  required
          ></v-text-field>
          <v-flex>
            <v-textarea
                    solo
                    v-model="description"
                    name="input-7-4"
                    label="Description"
                    :value="description"
                    auto-grow
                    required
            ></v-textarea>
          </v-flex>
          <v-flex v-if="customField" xs12 sm6 d-flex>
            <v-select
                    :items="items"
                    label="Choose Country"
            ></v-select>
          </v-flex>
          <v-flex v-if="setImageSize" xs12 sm6 d-flex>
            <v-select
                    :items="dimensions"
                    label="Image Size"
                    v-model="imageSize"
            ></v-select>
          </v-flex>
          <v-flex v-if="customUploadButton" xs12 sm6 d-flex>
              <input
                      v-validate="'image'"
                      data-vv-as="image"
                      name="image_field"
                      accept="image/*"
                      type="file"
                      @change="onFIlePicked"
              >
          </v-flex>
            <v-flex>
                <span v-show="errors.has('image_field')">Please select a valid image.</span>
            </v-flex>
          <v-flex v-if="imageUpload">
              <img :src="imageData" height="150" alt=""/>
          </v-flex>
          <div style="display: flex;justify-content: flex-end">
            <v-btn class="mb-3" color="info" @click="goBack" v-if="showCancel">Cancel</v-btn>
            <v-btn class="mb-3" color="info" @click="submitForm">Save</v-btn>
          </div>
        </v-form>
      </v-flex>
    </v-layout>
    </v-flex>
  </v-container>
</template>

<script>
    export default {
        name: "FormControl",
        props: {
            formItems: {
                type: Object
            },
            showCancel: {
                type: Boolean,
                default: false,
            },
            customField:{
                type: Boolean,
                default: false
            },
            customUploadButton:{
                type: Boolean,
                default: false
            },
            imageUpload: {
                type: Boolean,
                default: false
            },
            setImageSize: {
                type: Boolean,
                default: false
            },
            customSelect:{
                type: Boolean,
                default: false
            },
            title:{
                type:String,
            },
            subtitle:{
                type:String,
            },
            placeholderInput:{
                type:String,
            },
            placeholderTextArea:{
                type:String,
            }
        },
        data() {
            return {
                valid: false,
                name: '',
                imageSize: '',
                dimensions: ['1x1', '1x2'],
                description: '',
                imageData: '',
                nameRules: [
                    v => !!v || 'Name is required',
                    v => v.length <= 35 || 'Name must be less than 35 characters',
                    v => v.length >= 3 || 'Name must be greater than 2 characters'
                ],
                items: ['US', 'Pak', 'canada', 'india'],

            }
        },
        watch: {
            formItems: function (val) {
                this.name = val.name;
                this.description = val.description;
                this.imageData = val.imageData;
            }
        },
        methods: {
            submitForm() {
                if(this.$refs.form.validate()){
                    this.$emit('createFunc', this.name, this.description,  this.imageData, this.imageSize)
                }
            },
            goBack() {
              this.$router.go(-1)
            },
            onFIlePicked (event) {
                const files = event.target.files;
                let fileName = files[0].name;
                if (fileName.lastIndexOf('.') <= 0 ) {
                    return alert("please add a valid image")
                }
                const fileReader = new FileReader();
                fileReader.addEventListener('load', () => {
                    this.imageData = fileReader.result
                });
                fileReader.readAsDataURL(files[0]);
            }
        }
    }
</script>

<style>
  @import "../../styles/common.css";

  .titles{
    font-size: 22px;
    margin-bottom: 40px;

  }
  .subtitle{
    font-size: 18px;
    margin-bottom: 10px;
  }

  .shadow {
    -webkit-box-shadow: 1px 1px 5px -1px #888888;
    -moz-box-shadow: 1px 1px 5px -1px #888888;
    box-shadow: 1px 1px 5px -1px #888888;
    padding: 20px 20px;
    border-radius: 4px;
}
</style>
