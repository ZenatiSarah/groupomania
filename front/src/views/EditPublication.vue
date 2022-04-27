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
            <textarea
              :value="publication.content"
              class="form-control"
              id="content"
              rows="6"
            ></textarea>
            <div v-if="this.mode == 'imageInfos'">
              <p>{{ publication.image }}</p>
              <i class="fa-solid fa-pen" @click="editImage()"></i>
            </div>
            <div v-if="this.mode == 'imageEdit'">
              <input type="file" @change="selectFile" id="image" />
              <i class="fa-solid fa-circle-xmark" @click="backImage()"></i>
            </div>
          </div>
          <button class="btn btn-success" type="submit" @click="save()">
            Enregistrer
          </button>
          <button class="btn btn-danger" type="submit" @click="remove()">
            Supprimer
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
import { mapState } from "vuex";

export default {
  name: "EditPublication",
  data() {
    return {
      mode: "imageInfos",
      id: this.$store.state.user.id,
      publication: {},
      content: "",
      image: "",
    };
  },
  async mounted() {
    if (this.$store.state.user.id == -1) {
      this.$router.push("/");
      return;
    }
    const result = await axios.get(
      `http://localhost:3000/api/publications/${this.$route.params.id}`
    );
    const onepublication = result.data.data;
    this.publication = onepublication;
  },
  computed: {
    ...mapState(["publication"]),
  },
  methods: {
    editImage() {
      this.mode = "imageEdit";
    },
    backImage() {
      this.mode = "imageInfos";
    },
    selectFile: function () {
      const img = document.getElementById("image");

      if (img.files === 0) {
        return;
      } else {
        this.image = img.files[0];
      }
    },
    save() {
      var contentEdit = document.getElementById("content").value;
      if (this.mode == "imageInfos") {
        axios
          .patch(
            `http://localhost:3000/api/publications/${this.$route.params.id}`,
            {
              content: contentEdit,
              image: this.publication.image,
              id: this.$route.params.id,
              userId: this.id,
            }
          )
          .then(function () {
            window.location.href = "/publications/";
          });
      } else if (this.mode == "imageEdit") {
        axios
          .patch(
            `http://localhost:3000/api/publications/${this.$route.params.id}`,
            {
              content: contentEdit,
              image: this.image.name,
              id: this.$route.params.id,
              userId: this.id,
            }
          )
          .then(function () {
            window.location.href = "/publications/";
          });
      }
    },
    remove() {
      axios
        .delete(
          `http://localhost:3000/api/publications/${this.$route.params.id}`,
          {
            data: {
              id: this.publication.id,
            },
          }
        )
        .then(function () {
          window.location.href = "/publications/";
        });
    },
  },
};
</script>