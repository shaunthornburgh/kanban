import Vue from 'vue';
import ApolloClient from "apollo-boost";
import VueApollo from "vue-apollo";
import { AuthError, gqlErrors } from './utils';
import store from "./vuex.config";

Vue.use(VueApollo);

const apolloClient = new ApolloClient({
    uri: '/graphql',
    headers: {
        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
    },
    credentials: 'include',
    onError: (err) => (err) => {
        try {
            gqlErrors(err);
        } catch (err) {
            if (err instanceof AuthError) {
                store.dispatch("logout");
            }
        }
    }
});

export default new VueApollo({
   defaultClient: apolloClient
});
