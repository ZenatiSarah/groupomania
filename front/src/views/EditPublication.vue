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
        </ul>
      </div>
    </nav>

    <div class="card">
      <div class="card-body">
        <div class="card" style="width: 18rem">
          <div class="card-body">
            <p class="card-text">{{ publication.content }}</p>
            <p>{{ publication.image }}</p>
          </div>
          <button class="btn btn-success" type="submit" @click="save()">
            Enregistrer
          </button>
          <!-- <img class="card-img-top" src="currency.image" alt="" /> -->
        </div>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "EditPublication",
  data() {
    return {
      id: this.$store.state.user.id,
      idpublications: this.$route.params.id,
      publication: "",
    };
  },

  mounted() {
    if (this.$store.state.user.id == -1) {
      this.$router.push("/");
      return;
    }
    axios
      .get(`http://localhost:3000/api/publications/${this.idpublications}`)
      .then((response) => {
        this.publication = response.data.data;
      });
  },
};
</script>