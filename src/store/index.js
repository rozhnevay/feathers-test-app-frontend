import Vue from 'vue'
import Vuex from 'vuex'
import feathersVuex from 'feathers-vuex'
import feathersClient from '../feathers-client'

const { service, auth, FeathersVuex } = feathersVuex(feathersClient, { idField: 'id', enableEvents: true })

Vue.use(Vuex)
Vue.use(FeathersVuex)

Vue.config.devtools = true

export default new Vuex.Store({
    plugins: [
        service('users', { idField: 'id' }),
        service('books', {}),
        auth({ userService: 'users' })
    ]
})
