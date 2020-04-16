<template>
    <v-container>
        <v-layout>
            <v-flex mb-5 justify-center class="cs-2" style="display: flex">
                Event Title
            </v-flex>
        </v-layout>
        <v-layout>
            <v-flex mb-2 class="cs-2">
                Deactivate Event
            </v-flex>
        </v-layout>
        <v-container class="shadow">
            <v-form>
            <v-layout>
                <v-flex>
                    <v-select
                            solo
                            :items="items"
                            label="Choose">
                    </v-select>
                </v-flex>
            </v-layout>
            <v-layout>
                <v-flex>
                    <v-textarea
                            solo
                            label="Description *"
                            value=""
                            auto-grow
                            required
                    ></v-textarea>
                </v-flex>
            </v-layout>

            <v-flex style="display: flex" justify-center>
                <v-btn class="cs-font">Save</v-btn>
                <v-btn class="cs-font">Cancel</v-btn>
            </v-flex>
            </v-form>
        </v-container>
    </v-container>
</template>

<script>
    export default {
        name: "Deactivate",
        data: () => ({
            items: ['Event', 'Event2', 'Event3', 'Event4']
        })
    }
</script>

<style scoped>
    .shadow {
        -webkit-box-shadow: 1px 1px 5px -1px #888888;
        -moz-box-shadow: 1px 1px 5px -1px #888888;
        box-shadow: 1px 1px 5px -1px #888888;
        border-radius: 4px;
    }
    @font-face {
        font-family: ETProximaNova-bold;
        src: url(../../../fonts/proximanova-semibold-webfont.woff);
    }
    @font-face {
        font-family: ETProximaNova-regular;
        src: url(../../../fonts/proximanova-regular-webfont.woff);
    }
    .cs-font{
        font-family: ETProximaNova-bold;
    }

    .cs-2{
        font-family: ETProximaNova-bold;
        font-size:20px;
    }
</style>