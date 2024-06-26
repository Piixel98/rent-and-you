/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Body_auth_signin_api_v1_auth_signin_post = {
    properties: {
        grant_type: {
    type: 'string',
    pattern: 'password',
},
        username: {
    type: 'string',
    isRequired: true,
},
        password: {
    type: 'string',
    isRequired: true,
},
        scope: {
    type: 'string',
},
        client_id: {
    type: 'string',
},
        client_secret: {
    type: 'string',
},
    },
} as const;
