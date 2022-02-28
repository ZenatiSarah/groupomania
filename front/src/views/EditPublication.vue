<template>
  <div class="card" id="v-for-object">
    <div
      class="card-body"
      v-for="publication in publication"
      :key="publication.id"
    >
      {{ publication.image }}
      <div class="card" style="width: 18rem">
        <div class="card-body">
          <p class="card-text">{{ publication.content }}</p>
        </div>
        <button class="btn btn-success" type="submit" @click="save()">
          Enregistrer
        </button>
        <!-- <img class="card-img-top" src="currency.image" alt="" /> -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Publication",
  data() {
    return {
      id: this.$store.state.user.id,
    };
  },
  mounted() {
    if (this.$store.state.user.id == -1) {
      this.$router.push("/");
      return;
    }

    this.$store.dispatch("getPublication");
  },
  computed: {
    ...mapState(["publication"]),
  },
  methods: {
    save: function () {
      const self = this;
      this.$store
        .dispatch("modification", {
          image: this.image.name,
          content: this.content,
        })
        .then(function () {
          self.$router.push("publication");
        })
        .then(function (error) {
          console.log(error);
        });
    },
  },
};
</script>