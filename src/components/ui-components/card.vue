<template>
    <v-flex class="border-radius" md4 mr-2 pt-4 pb-4 :style="{backgroundColor:bgColor}">
        <v-flex ml-3 class="count">{{ counts }}</v-flex>
        <v-flex ml-3 class="sectionTitle">{{ sectionTitle }}</v-flex>
        <v-flex ml-3 class="percentage">{{ percentageCount }}</v-flex>
    </v-flex>
</template>

<script>
    export default {
        name: "Card",
        props:['bgColor','counts','sectionTitle','percentageCount'],
    }
</script>

<style scoped>
    .count{
        font-family: ETProximaNova-bold;
        font-size: 16px;
        color: white;
    }
    .percentage{
        font-family: ETProximaNova-bold;
        font-size: 16px;
        color: white;
    }
    .sectionTitle{
        font-family: ETProximaNova-regular;
        font-size: 18px;
        color: white;
    }
</style>