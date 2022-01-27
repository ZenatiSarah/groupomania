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
        post: '',
        publications: null,
        userInfos: '',
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
        setUserInfos: function (state, listuserInfo) {
            state.userInfos = listuserInfo;
        },
    },
    actions: {
        createAccount: ({ commit }, userInfos) => {
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
        post: ({ commit }, data) => {
            axios.post('http://localhost:3000/api/publications/', data)
                .then((response) => {
                    commit("setStatus", "");
                    commit('post', response.data);
                })
        },
        getPublications: ({ commit }) => {
            axios.get('http://localhost:3000/api/publications/')
                .then((response) => {
                    commit('setPublications', response.data.data)
                });
        },
        getUserInfos: ({ commit }) => {
            return new Promise((resolve) => {
                commit('setUserInfos', '');
                axios.get('http://localhost:3000/api/users/profile')
                    .then((response) => {
                        commit('setUserInfos', response.data);
                        console.log(response.data);
                        resolve(response)
                    })
            });
        },
    }
});


export default store;