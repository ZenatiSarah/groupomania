import { createStore } from 'vuex';
const axios = require('axios');

const instance = axios.create({
    baseURL: 'http://localhost:3000/api/users/'
});


let user = localStorage.getItem('user');
if (!user) {
    user = {
        id: -1,
        token: ''
    };
} else {
    try {
        user = JSON.parse(user);
        instance.defaults.headers.common['Authorization'] = user.token;
    } catch (ex) {
        user = {
            id: -1,
            token: ''
        };
    }
}

const store = createStore({
    state: {
        status: '',
        user: user,
        id: user.id,
        post: '',
        publications: null,
        publication: null,
        userInfos: {
            id: '',
            userName: '',
            firstName: '',
            lastName: '',
        },
    },
    getters: {
        getPublications: state => state.publications,
        getUserInfos: state => state.userInfos,
    },
    mutations: {
        setStatus: function (state, status) {
            state.status = status;
        },
        logUser: function (state, user) {
            instance.defaults.headers.common['Authorization'] = user.token;
            localStorage.setItem('user', JSON.stringify(user))
            state.user = user;
        },
        userInfos: function (state, userInfos) {
            state.userInfos = userInfos;
        },
        logout: function (state) {
            state.user = {
                id: -1,
                token: ''
            };
            localStorage.removeItem('user')
        },
        post: function (state, post) {
            state.post = post;
        },
        setPublications: function (state, listePublications) {
            state.publications = listePublications;
        },

    },
    actions: {
        createAccount: ({ commit }, userInfos) => {
            console.log(userInfos)
            return new Promise((resolve) => {
                commit("setStatus", "loading");
                axios.post('http://localhost:3000/api/users/signup', userInfos)
                    .then((response) => {
                        commit("setStatus", "created");
                        resolve(response)
                    })
            })
        },
        login: ({ commit }, userInfos) => {
            commit('setStatus', 'loading');
            return new Promise((resolve) => {
                axios.post('http://localhost:3000/api/users/login', userInfos)
                    .then((response) => {
                        commit('setStatus', '');
                        commit('logUser', response.data);
                        resolve(response);
                    })
            });
        },
        editUser: ({ commit }, userInfos) => {
            axios.patch(`http://localhost:3000/api/users/profile/22`, userInfos)
                .then((response) => {
                    commit('logUser', response.data);
                    console.log(response.data)
                })
                .catch(function (error) {
                    console.log(error)
                });
        },
        //Ajouter une publication
        post: ({ commit }, data) => {
            axios.post('http://localhost:3000/api/publications/', data)
                .then((response) => {
                    commit("setStatus", "");
                    commit('post', response.data);
                })
        },
        //Récupérer toutes les publications
        getPublications: ({ commit }) => {
            commit('setPublications', 'loading');
            return new Promise((resolve) => {
                axios.get('http://localhost:3000/api/publications/')
                    .then((response) => {
                        commit('setPublications', response.data.data)
                        console.log(response.data.data)
                        resolve(response);
                    });
            });

        },
        getUserInfos: ({ commit }) => {
            axios.get('http://localhost:3000/api/users/')
                .then(function (response) {
                    commit('setUserInfos', response.data.data);
                    console.log(response.data.data)
                })
                .catch(function () {
                });
        },
        // Modifier une publication
        /*
        editPublications: ({ commit }) => {
            commit('setPublications', 'loading');
            return new Promise((resolve) => {
                axios.patch('http://localhost:3000/api/publications/:id')
                    .then((response) => {
                        commit('setPublications', response.data.data)
                        resolve(response);
                    });
            });

        },*/
    }
});


export default store;