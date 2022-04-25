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

    <div class="form-group">
      <label for="publication">Exprimez-vous !</label>
      <textarea
        v-model="content"
        class="form-control"
        id="publication"
        rows="6"
      ></textarea>
      <div class="btn-form">
        <input
          type="file"
          accept="image/*"
          class="form-control-file"
          id="inputImage"
          @change="selectFile"
        />
        <button @click="send()" class="btn btn-primary">Publiez !</button>
      </div>
    </div>
    <div class="card" id="v-for-object">
      <div
        class="card-body"
        v-for="currency in publications"
        :key="currency.id"
      >
        <div class="card" style="width: 18rem">
          <div class="card-body">
            <p class="card-text">{{ currency.content }}</p>
            <p>{{ currency.image }}</p>
          </div>

          <router-link
            :to="`/publications/${currency.id}`"
            class="btn btn-primary"
          >
            Voir plus</router-link
          >

          <!-- <img class="card-img-top" src="currency.image" alt="" /> -->
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { mapState } from "vuex";
export default {
  name: "Publications",
  data: function () {
    return {
      image: "",
      content: "",
      id: this.$store.state.user.id,
    };
  },
  methods: {
    selectFile: function () {
      const img = document.getElementById("inputImage");
      if (img.files === 0) {
        return;
      } else {
        this.image = img.files[0];
      }
    },
    send: function () {
      this.$store
        .dispatch("post", {
          image: this.image.name,
          content: this.content,
          userId: this.id,
        })
        .then(function () {
          location.reload();
        });
    },
  },
  mounted: function () {
    if (this.$store.state.user.id == -1) {
      this.$router.push("/");
      return;
    }
    this.$store.dispatch("getPublications");
  },
  computed: {
    ...mapState(["publications"]),
  },
};
</script>


<style scoped>
#navbarSupportedContent {
  margin-left: 2rem;
}
.form-group,
.card {
  display: flex;
  flex-direction: column;
  margin-top: 5rem;
  align-items: center;
}

label,
textarea {
  margin-bottom: 2rem;
}

textarea {
  width: 30rem;
  height: 65px;
}
</style>