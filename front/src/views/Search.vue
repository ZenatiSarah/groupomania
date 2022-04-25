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
            <router-link to="/publications/" class="nav-link"
              >Publications</router-link
            >
          </li>
          <li class="nav-item">
            <router-link :to="'/profile/' + this.id" class="nav-link"
              >Profile</router-link
            >
          </li>
          <li class="nav-item">
            <router-link to="/rechercher/" class="nav-link"
              >Rechercher</router-link
            >
          </li>
        </ul>
      </div>
    </nav>
    <router-view />

    <main>
      <input type="text" class="filter" v-model="search" />
      <p>{{ search }}</p>

      <div class="card-body" v-for="item in users" :key="item.id">
        <div class="card" style="width: 18rem">
          <div class="card-body">
            <p class="card-text">{{ item.userName }}</p>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Search",
  data: function () {
    return {
      id: this.$store.state.user.id,
      search: null,
    };
  },
  mounted: function () {
    if (this.$store.state.user.id == -1) {
      this.$router.push("/");
      return;
    }
    this.$store.dispatch("getUsers");
  },
  computed: {
    ...mapState(["users"]),
  },
};
</script>