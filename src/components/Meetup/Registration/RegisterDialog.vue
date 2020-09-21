<template>
  <div>
    <v-btn
      class="primary"
      accent
      @click.stop="openDialog()"
    >{{userIsRegistered ? 'Unregister' : 'Register'}}</v-btn>

    <v-dialog width="350px" persistent v-model="registerDialog" @activatorr="openDialog">
      <v-card>
        <v-container>
          <v-row>
            <v-col xs="12">
              <v-card-title
                class="headline lighten-1"
                v-if="userIsRegistered"
              >Unregister for Meetup?</v-card-title>
              <v-card-title v-else>Register for Meetup?</v-card-title>
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <v-row>
            <v-col xs="12">
              <v-card-text>You can always change your decision later on.</v-card-text>
            </v-col>
          </v-row>
          <v-row>
            <v-col xs="12">
              <v-card-actions>
                <v-btn class="red--text darken-1" text @click="registerDialog = false">Cancel</v-btn>
                <v-btn class="green--text darken-1" text @click="onAgree">Confirm</v-btn>
              </v-card-actions>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  props: ["meetupId"],
  data() {
    return {
      registerDialog: false,
    };
  },
  computed: {
    userIsRegistered() {
      return (
        this.$store.getters.user.registeredMeetups.findIndex((meetupId) => {
          console.log(meetupId);
          return meetupId === this.meetupId;
        }) >= 0
      );
    },
  },
  methods: {
    openDialog() {
      this.registerDialog = true;
    },
    onAgree() {
      if (this.userIsRegistered) {
        this.$store.dispatch("unregisterUserFromMeetup", this.meetupId);
        this.registerDialog = false;
      } else {
        this.$store.dispatch("registerUserForMeetup", this.meetupId);
        this.registerDialog = false;
      }
    },
  },
};
</script>