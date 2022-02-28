<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <router-link to="/home" class="nav-link">Accueil</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/publication" class="nav-link"
              >Publications</router-link
            >
          </li>
          <li class="nav-item">
            <router-link :to="'/profile/' + this.id" class="nav-link"
              >Profile</router-link
            >
          </li>
        </ul>
      </div>
    </nav>
    <router-view />

    <section>
      <h1>Publications</h1>
      <div class="card" id="v-for-object">
        <div
          class="card-body"
          v-for="currency in publications"
          :key="currency.id"
        >
          {{ currency.image }}
          <div class="card" style="width: 18rem">
            <div class="card-body">
              <p class="card-text">{{ currency.content }}</p>
            </div>
            <button class="btn btn-success" type="submit" @click="edit()">
              Modifier
            </button>
            <!-- <img class="card-img-top" src="currency.image" alt="" /> -->
          </div>
        </div>
      </div>
    </section>
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
    this.$store.dispatch("getPublications");
  },
  computed: {
    ...mapState(["publications"]),
  },
  methods: {
    edit: function () {
      this.$router.push("/modification");
    },
  },
};
</script>

<style scoped>
#navbarSupportedContent {
  margin-left: 2rem;
}
</style>