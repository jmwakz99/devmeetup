<template>
  <v-container>
    <v-row v-if="!meetup">
      <v-col xs="12" class="text-center">
        <v-progress-circular indeterminate color="red" :width="7" :size="70"></v-progress-circular>
      </v-col>
    </v-row>

    <v-row v-else>
      <v-col xs="12">
        <v-card>
          <v-card-title>
            <h6 class="primary--text">{{meetup.title}}</h6>
            <v-spacer></v-spacer>
            <app-edit-meetup-details-dialog :meetup="meetup" :userIsCreator="userIsCreator"></app-edit-meetup-details-dialog>
          </v-card-title>
          <v-img height="400px" :src="meetup.imageUrl"></v-img>
          <v-card-text>
            <div class="info--text">{{meetup.date | date }}- {{meetup.location}}</div>
            <div>{{meetup.description}}</div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="primary">Register</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  props: ["id"],
  data() {
    return {
      dialog: false,
    };
  },
  computed: {
    meetup() {
      return this.$store.getters.loadedMeetup(this.id);
    },
    userIsAuthenticated() {
      return (
        this.$store.getters.user !== null &&
        this.$store.getters.user !== undefined
      );
    },
    userIsCreator() {
      if (!this.userIsAuthenticated) {
        return false;
      }
      return this.$store.getters.user.id === this.meetup.creatorId;
    },
    loading() {
      return this.$store.getters.loading;
    },
  },
};
</script>