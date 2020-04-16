<template>
  <v-app id="inspire">
    <v-navigation-drawer
      :clipped="$vuetify.breakpoint.lgAndUp"
      v-model="drawer"
      dark
      app
      width="250"
      :style="customColor"
    >
      <v-list dense>
        <template v-for="item in items">
          <v-list-group
            v-if="item.children"
            v-model="item.model"
            :key="item.text"
            :prepend-icon="item.model ? item.icon : item['icon-alt']"
            append-icon=""
          >
            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ item.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile

              v-for="(child, i) in item.children"
              :key="i"
              @click="goTo(child.path)"
            >
              <v-list-tile-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ child.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
          <v-list-tile v-else :key="item.text" @click="goTo(item.path)"
          >
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                {{ item.text }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      :style="customColor"
      fixed
    >
      <v-toolbar-title :style="customColor" style="width: 300px" class="ml-0 pl-3">
        <v-toolbar-side-icon :style="customColor" @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <span class="hidden-sm-and-down brand-name">Eventackle Admin</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <v-spacer></v-spacer>
      <a class="bold-font" style="color: white;cursor: pointer" @click="logOut">Logout</a>
      <v-btn icon large>
        <v-avatar size="36px">
          <img
            src="https://unsplash.com/photos/poTq8GIXIWY/download?force=true"
            alt="img"
          >
        </v-avatar>
      </v-btn>
    </v-toolbar>
    <v-content>
      <v-container>
        <v-layout>
          <router-view></router-view>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
    import * as Storage from '../storage'
    export default {
    name: 'Dashboard',
    data: () => ({
      dialog: false,
      drawer: null,
        customFont: {
            'font-size': '34px',
            'font-family': 'ETProximaNova-bold'
        },
        customColor:{
          'background':'#2f3e4c',
            'color':'white'
        },
      items: [
          {icon: 'home', text: 'Dashboard', path:'/' },
          {icon: 'keyboard_arrow_up',
          'icon-alt': 'keyboard_arrow_down',
          text: 'Organizers',
          model: false,
          children: [
            { icon: 'list_alt', text: 'Profile List', path: '/organiser/profile-list' },
            { icon: 'list_alt', text: 'Pending List', path: '/organiser/request-list' }
          ]
        },
        {
          icon: 'keyboard_arrow_up',
          'icon-alt': 'keyboard_arrow_down',
          text: 'Events',
          model: false,
          children: [
            { icon: 'list_alt', text: 'Event List', path: '/event/list/event-list' },
          ]
        },
          {icon: 'keyboard_arrow_up',
              'icon-alt': 'keyboard_arrow_down',
              text: 'Event Attributes',
              model: false,
              children: [
                  { icon: 'event', text: 'Area Of Interest',path:'/event/area-of-interest/list' },
                  { icon: 'category', text: 'Categories', path:'/event/categories/list' },
                  { icon: 'contacts', text: 'Job Position', path:'/event/job-position/list' },
                  { icon: 'category', text: 'Type', path:'/event/event-type/list' }
              ]
          },
          {icon: 'keyboard_arrow_up',
              'icon-alt': 'keyboard_arrow_down',
              text: 'Users',
              model: false,
              children: [
                  { icon: 'list_alt', text: 'User List', path:'/user-list' },
                  { icon: 'list_alt', text: 'Attendees List', path: '/reports/attendee-list' },
              ]
          },
        {icon: 'keyboard_arrow_up',
          'icon-alt': 'keyboard_arrow_down',
          text: 'Finance',
          model: false,
          children: [
            { icon: 'money', text: 'Ticket List', path: '/finance/ticket-list' },
            { icon: 'attach_money', text: 'Payouts', path: '/finance/payouts' }
          ]
        },
          {icon: 'keyboard_arrow_up',
              'icon-alt': 'keyboard_arrow_down',
              text: 'Settings',
              model: false,
              children: [
                  { icon: 'settings', text: 'Eventackle Commission', path: '/settings/et-commission' },
              ]
          },
        { icon: 'place', text: 'Regions', path:'/regions/list' },

          {icon: 'keyboard_arrow_up',
              'icon-alt': 'keyboard_arrow_down',
            text: 'Reports',
            model:false,
            children:[
                { icon: 'list_alt', text: 'Organizers Report', path: '/reports/organiser-list' },
                { icon: 'description', text: 'Events Report', path: '/reports/event-reports' }
            ]
        },
      ]
    }),
    methods: {
      goTo(route) {
        this.$router.push({ path: route });
      },
      logOut() {
          Storage.removeToken();
          this.$router.push({path: '/login'});
      }
    }
  }
</script>


<style>
  @import "../styles/common.css";

  .brand-name{
  font-size: 20px;
  font-family: ETProximaNova-bold;
}
</style>
