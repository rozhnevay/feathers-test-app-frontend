import feathers from '@feathersjs/feathers'
import rest  from '@feathersjs/rest-client'
import auth from '@feathersjs/authentication-client'
import axios from "axios";

export const host = process.env.API_HOST || 'http://localhost:3030'

const restClient = rest('http://localhost:3030')

const feathersClient = feathers()
    .configure(restClient.axios(axios))
    .configure(auth({ storage: window.localStorage }))

export default feathersClient

