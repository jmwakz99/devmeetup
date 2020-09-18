<template>
  <v-container>
    <v-row>
      <v-col xs="12" sm="6" offset-sm="3">
        <h3 class="grey--text">Create a new Meetup</h3>
      </v-col>
    </v-row>
    <v-row>
      <v-col xs="12">
        <form @submit.prevent="onCreateMeetup">
          <v-row>
            <v-col xs="12" sm="6" offset-sm="3">
              <v-text-field name="title" id="title" v-model="title" label="Title" required></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col xs="12" sm="6" offset-sm="3">
              <v-text-field
                name="location"
                id="location"
                v-model="location"
                label="Location"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col xs="12" sm="6" offset-sm="3">
              <v-file-input
                label="Upload your image"
                prepend-icon="mdi-camera"
                @change="onFilePicked"
                accept="image/*"
              ></v-file-input>
            </v-col>
          </v-row>
          <v-row>
            <v-col xs="12" sm="6" offset-sm="3">
              <img :src="imageUrl" height="150" />
            </v-col>
          </v-row>
          <v-row>
            <v-col xs="12" sm="6" offset-sm="3">
              <v-textarea
                name="description"
                id="description"
                v-model="description"
                label="Description"
                required
              ></v-textarea>
            </v-col>
          </v-row>
          <v-row>
            <v-col xs="12" sm="6" offset-sm="3">
              <h4 class="grey--text">Choose a Date and Time</h4>
            </v-col>
          </v-row>
          <v-row class="mb-2">
            <v-col xs="12" sm="6" offset-sm="3">
              <v-date-picker v-model="datePicker"></v-date-picker>
              <br />
            </v-col>
          </v-row>

          <v-row>
            <v-col xs="12" sm="6" offset-sm="3">
              <v-time-picker ampm-in-title v-model="timePicker"></v-time-picker>
              <br />
            </v-col>
          </v-row>
          <v-row>
            <v-col xs="12" sm="6" offset-sm="3">
              <v-btn class="primary" type="submit" :disabled="!formIsValid">Create Meetup</v-btn>
            </v-col>
          </v-row>
        </form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      location: "",
      imageUrl: "",
      description: "",
      datePicker: new Date().toISOString().substr(0, 10),
      timePicker: new Date(),
      image: null,
    };
  },
  computed: {
    formIsValid() {
      return (
        this.title !== "" &&
        this.location !== "" &&
        this.imageUrl !== "" &&
        this.description !== ""
      );
    },
    submittableDateTime() {
      const date = new Date(this.datePicker);
      if (typeof this.timePicker === "string") {
        const hours = this.timePicker.match(/^(\d+)/)[1];
        const minutes = this.timePicker.match(/:(\d+)/)[1];
        date.setHours(hours);
        date.setMinutes(minutes);
      } else {
        date.setHours(this.timePicker.getHours());
        date.setMinutes(this.timePicker.getMinutes());
      }

      return date;
    },
  },
  methods: {
    onCreateMeetup() {
      if (!this.formIsValid) {
        return;
      }
      if (!this.image) {
        return;
      }
      const meetupData = {
        title: this.title,
        location: this.location,
        image: this.image,
        description: this.description,
        date: this.submittableDateTime,
      };
      this.$store.dispatch("createMeetup", meetupData);
      this.$router.push("/meetups");
    },
    onFilePicked(event) {
      const filename = event.name;
      if (filename.lastIndexOf(".") <= 0) {
        return alert("Please add a valid file");
      }
      const fileReader = new FileReader();

      fileReader.addEventListener("load", () => {
        this.imageUrl = fileReader.result;
        console.log("yes");
      });

      fileReader.readAsDataURL(event);
      this.image = event;
      console.log(this.image);
    },
  },
};
</script>




























    
