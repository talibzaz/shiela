// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import { ApolloClient } from 'apollo-client'
import { ApolloLink,concat} from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import VueApollo from 'vue-apollo'
import Vue from 'vue'
import App from './App'
import Vuetify from 'vuetify'
import VeeValidate from 'vee-validate';
import 'vuetify/dist/vuetify.min.css'
import router from './router'
import * as Storage from './storage';
import * as Constants from './constants'

Vue.config.productionTip = false;

Vue.use(Vuetify);
Vue.use(VeeValidate);

const httpLink = new HttpLink({

    uri: Constants.getUriByEnv(),
});


const authMiddleware = new ApolloLink((operation, forward) => {
    // add the authorization to the headers
    operation.setContext({
        headers: {
            Authorization: `Bearer ${Storage.getToken()}`,
        }
    });
    return forward(operation);
});


const apolloClient = new ApolloClient({
    link: concat(authMiddleware, httpLink),
    cache: new InMemoryCache(),
    connectToDevTools: true,
});

Vue.use(VueApollo);

const apolloProvider = new VueApollo({
    defaultClient: apolloClient,
});

new Vue({
  el: '#app',
  router,
  components: { App },
  provide: apolloProvider.provide(),
  template: '<App/>'
});