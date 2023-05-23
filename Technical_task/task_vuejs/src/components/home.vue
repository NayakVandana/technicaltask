<template>
  <div class="container">
    <div class="section-one"><div><h3>Search Anime Characters</h3></div>
    <div>
      <input
        class="form-control me-2"
        v-model="searchQuery"
        @keyup="fetchCharacters"
        type="search"
        placeholder="Search"
        aria-label="Search"
      />
    </div></div>
    <div>
      <div
        class="display-list"
        v-for="character in filteredCharacters"
        :key="character.id"
      >
        <div v-if="no"><span>No data</span></div>
        <div class="card" v-else>
          <div class="card-body list-main">
            <div>
              <div
                v-for="nickname in character.nicknames"
                :key="nickname"
              ></div>
              <div class="list-main">
                <div>
                  <img
                    :src="character.images.jpg.image_url"
                    alt="Character Image"
                    class="images"
                  />
                </div>
                <div class="name-section">
                  <h5 class="card-title">{{ character.name }}</h5>
                  <div>
                    <span
                      v-for="nickname in character.nicknames"
                      class="nicknames"
                      :key="nickname"
                      >{{ nickname }}</span
                    >
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div>
                <span class="author favspan">
                  <i class="fa fa-heart" aria-hidden="true"></i
                  >{{ character.favorites }}</span
                >
                <i
                  @click="openCharacterDetails(character)"
                  class="fa fa-arrow-right arrow"
                  aria-hidden="true"
                ></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="list-main">
        <button @click="previousPage" :disabled="page === 1">Previous</button>
        <button @click="nextPage">Next</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      page: 1,
      limit: 10,
      searchQuery: "",
      characters: [],
      no: false,
    };
  },
  mounted() {
    this.fetchCharacters();
  },
  methods: {
    fetchCharacters() {
      const url = `https://api.jikan.moe/v4/characters?page=${this.page}&limit=${this.limit}&q=${this.searchQuery}&order_by=favorites&sort=desc`;

      axios
        .get(url)
        .then((response) => {
          this.characters = response.data.data;
          this.no = false; // Reset the "no" flag if data is retrieved successfully
        })
        .catch((error) => {
          console.error(error);
          this.no = true;
        });
    },
    previousPage() {
      if (this.page > 1) {
        this.page--;
        this.fetchCharacters();
      }
    },
    nextPage() {
      this.page++;
      this.fetchCharacters();
    },
    // Inside the Vue component

    openCharacterDetails(character) {
      const newTab = window.open("", "_blank");
      newTab.document.write(`
      <html>
        <head>
          <title>${character.name}</title>
          <style>
            /* Add some basic styles for the table */
            table {
              border-collapse: collapse;
              width: 100%;
            }
            th, td {
              border: 1px solid #dddddd;
              text-align: left;
              padding: 8px;
            }
            th {
              background-color: #f2f2f2;
            }
          </style>
        </head>
        <body>
          <h1>${character.name}</h1>
          <table>
            <tr>
              <th>Nickname</th>
              <th>Favorites</th>
            </tr>
            ${character.nicknames
              .map(
                (nickname) => `
                <tr>
                  <td>${nickname}</td>
                  <td>${character.favorites}</td>
                </tr>
              `
              )
              .join("")}
          </table>
        </body>
      </html>
    `);
    },
  },
  computed: {
    filteredCharacters() {
      if (this.searchQuery.length === 0) {
        return this.characters;
      }

      const query = this.searchQuery.toLowerCase();

      return this.characters.filter((character) =>
        character.name.toLowerCase().includes(query)
      );
    },
  },
};
</script>
