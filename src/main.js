import Vue from "vue";

import ApolloClient from "apollo-client";

import { HttpLink } from "apollo-link-http";

import { InMemoryCache } from "apollo-cache-inmemory";

import VueApollo from "vue-apollo";

import App from "./App.vue";

// import { WebSocketLink } from 'apollo-link-ws'

Vue.use(VueApollo);

Vue.config.productionTip = false;
const getHeaders = () => {
  const headers = {};
  const token =
    "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik9FWTJSVGM1UlVOR05qSXhSRUV5TURJNFFUWXdNekZETWtReU1EQXdSVUV4UVVRM05EazFNQSJ9.eyJodHRwczovL2hhc3VyYS5pby9qd3QvY2xhaW1zIjp7IngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6InVzZXIiLCJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiXSwieC1oYXN1cmEtdXNlci1pZCI6ImF1dGgwfDYwOTI1MDZlOTkyOGM4MDA3MDg0MzhhOCJ9LCJuaWNrbmFtZSI6ImpvZmlmIiwibmFtZSI6ImpvZmlmQG1haWxpbmF0b3IuY29tIiwicGljdHVyZSI6Imh0dHBzOi8vcy5ncmF2YXRhci5jb20vYXZhdGFyLzM5MzdkNWVlYjNlMGJjYTM2YWE4N2JlZDU4NTZkMGJiP3M9NDgwJnI9cGcmZD1odHRwcyUzQSUyRiUyRmNkbi5hdXRoMC5jb20lMkZhdmF0YXJzJTJGam8ucG5nIiwidXBkYXRlZF9hdCI6IjIwMjEtMDUtMDVUMDc6NTk6NDMuNDA2WiIsImlzcyI6Imh0dHBzOi8vZ3JhcGhxbC10dXRvcmlhbHMuYXV0aDAuY29tLyIsInN1YiI6ImF1dGgwfDYwOTI1MDZlOTkyOGM4MDA3MDg0MzhhOCIsImF1ZCI6IlAzOHFuRm8xbEZBUUpyemt1bi0td0V6cWxqVk5HY1dXIiwiaWF0IjoxNjIwMjA0MjkyLCJleHAiOjE2MjAyNDAyOTIsImF0X2hhc2giOiJBd1MzcTU2cnBlNFJFZVlkaWJ0SHZnIiwibm9uY2UiOiJnNG5OZGNFTFVxWlRNbjNFNUFpUGNzWktLVUZMU2twNCJ9.bHDrfPAijOGSp0pTqm1x6Jsz_5zPdkD0QNRnammZHkfl8o2wSWbBIBak97za1AqGPRYJfS3b0Qff8bxOn8rLLYaAxUJ9nDwRX6Q7C7RggAP8zTbLl5NuYNvBxAVFJylAK_mABbu7onyCnbVAnPWZj9PoT9zVv5xFKOROsGjQgkw8hwaduSE082hO_gT0ILwlsPzIt0NzLz1SI1QNtq2qLrZ2_z8UkRjhH63973FpxY8pxDCaBXmCDBL0E0fbgSiTl5tliZL7vDwE4G4j9K9YedswF0jZ4CGjlmM6UR7DMOevJbaRxr4Znim0EBoeA7raFWHHcIdGkWBoo4_-3POqyg";
  if (token) {
    headers[
      "x-hasura-admin-secret"
    ] = `EqAzj2JNpFcnHQRlCRrwJlCCrQbobhY47HuW2n7Biyr56npaGqF6BSE4UkeBvzNf`;
    headers["content-type"] = `application/json`;
  }
  return headers;
};
// Create an http link:
const link = new HttpLink({
  uri: "https://natural-raccoon-98.hasura.app/v1/graphql",
  fetch,
  headers: getHeaders(),
});

// Create the subscription websocket link
// const wsLink = new WebSocketLink({
//   uri: 'https://natural-raccoon-98.hasura.app/v1/graphql',
//   options: {
//     reconnect: true,
//   },
// })

const client = new ApolloClient({
  link: link,
  // wsLink,
  cache: new InMemoryCache({
    addTypename: true,
  }),
});

const apolloProvider = new VueApollo({
  defaultClient: client,
});

new Vue({
  apolloProvider,
  render: (h) => h(App),
}).$mount("#app");
