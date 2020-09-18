<template>
  <v-container>
    <v-row class="mb-2">
      <v-col xs="12" sm="6" class="text-center text-sm-right">
        <v-btn large to="/meetups" class="info">Explore Meetups</v-btn>
      </v-col>
      <v-col xs="12" sm="6" class="text-center text-sm-left">
        <v-btn large to="/meetup/new" class="info">Organize Meetup</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col xs="12" class="text-center">
        <v-progress-circular indeterminate color="red" :width="7" :size="70" v-if="loading"></v-progress-circular>
      </v-col>
    </v-row>
    <v-row class="mt-2" v-if="!loading">
      <v-col xs="12">
        <v-carousel style="cursor: pointer">
          <v-carousel-item
            v-for="meetup in meetups"
            :key="meetup.id"
            :src="meetup.imageUrl"
            @click="onLoadMeetup(meetup.id)"
            reverse-transition="fade-transition"
            transition="fade-transition"
          >
            <div class="title">{{meetup.title}}</div>

            <!-- <div class="title">{{meetup.title}}</div> -->
          </v-carousel-item>
        </v-carousel>
      </v-col>
    </v-row>
    <v-row class="mt-2">
      <v-col xs="12" class="text-center">
        <p>Join our awesome meetups!</p>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  computed: {
    meetups() {
      return this.$store.getters.featuredMeetups;
    },
    loading() {
      return this.$store.getters.loading;
    },
  },
  methods: {
    onLoadMeetup(id) {
      this.$router.push("/meetups/" + id);
    },
  },
};
</script>
 <style  scoped>
.title {
  position: absolute;
  bottom: 50px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  font-size: 2em;
  padding: 20px;
  text-align: center;
  left: 50%;
  transform: translate(-50%, 0);
}
</style>   
 