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
            <router-link to="/profile" class="nav-link">Profile</router-link>
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
          class="form-control-file"
          id="inputImage"
          @change="selectFile"
        />
        <button @click="send()" class="btn btn-primary">Publiez !</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.form-group {
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
}
</style>
<script>
export default {
  name: "Home",
  data: function () {
    return {
      image: "",
      content: "",
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
      const self = this;
      this.$store
        .dispatch("post", {
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
  mounted: function () {
    if (this.$store.state.user.id == -1) {
      this.$router.push("/");
      return;
    }
  },
};
</script>

<style scoped>
#navbarSupportedContent {
  margin-left: 2rem;
}
</style>