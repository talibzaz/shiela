<template>
    <v-flex class="border-radius" md4 pt-4 pb-4 mr-2 :style="{backgroundColor:bgColor}">
            <v-flex ml-2 class="sectionTitle">{{ sectionTitle }}</v-flex>
            <v-flex ml-2 class="count">{{ count }} {{userType}}</v-flex>
            <v-btn  ml-4 class="btn-style" @click="goTo">{{ btnLabel }}</v-btn>
        </v-flex>
</template>

<script>
    export default {
        name: "DashboardStatsCard",
        props:['bgColor','count','sectionTitle','userType','btnLabel'],
        methods: {
            goTo() {
                this.$emit('click')
            }
        }
    }
</script>

<style scoped>
    .count{
        font-size: 18px;
        color: white;
    }
    .sectionTitle{
        font-family: ETProximaNova-bold;
        font-size: 18px;
        color: white;
    }
    .btn-style{
      font-family: ETProximaNova-bold;
        font-size: 12px;
    }

</style>
