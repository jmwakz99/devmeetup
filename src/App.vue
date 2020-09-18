<template>
  <v-app>
    <v-navigation-drawer temporary app v-model="sidenav">
      <v-list dense>
        <v-list-item :to="item.link" link v-for="item in menuItems" :key="item.title">
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="onLogout" v-if="userIsAuthenticated">
          <v-list-item-action>
            <v-icon>mdi-exit-to-app</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar dark app class="primary">
      <v-app-bar-nav-icon @click.stop="sidenav = !sidenav" class="hidden-sm-and-up"></v-app-bar-nav-icon>
      <router-link to="/" tag="span" style="cursor: pointer">DevMeetup</router-link>

      <v-spacer></v-spacer>
      <div class="hidden-xs-only">
        <v-btn :to="item.link" text v-for="item in menuItems" :key="item.title">
          <v-icon left dark>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
        <v-btn @click="onLogout" text v-if="userIsAuthenticated">
          <v-icon left dark>mdi-exit-to-app</v-icon>Logout
        </v-btn>
      </div>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
    sidenav: false,
  }),
  computed: {
    menuItems() {
      let menuItems = [
        { icon: "mdi-face", title: "Sign up", link: "/signup" },
        { icon: "mdi-lock", title: "Sign in", link: "/signin" },
      ];
      if (this.userIsAuthenticated) {
        menuItems = [
          {
            icon: "mdi-account-supervisor",
            title: "View Meetups",
            link: "/meetups",
          },
          {
            icon: "mdi-map-marker",
            title: "Organize Meetup",
            link: "/meetup/new",
          },
          { icon: "mdi-account", title: "Profile", link: "/profile" },
        ];
      }
      return menuItems;
    },
    userIsAuthenticated() {
      return (
        this.$store.getters.user !== null &&
        this.$store.getters.user !== undefined
      );
    },
  },

  methods: {
    onLogout() {
      this.$store.dispatch("logout");
    },
  },
};
</script>
