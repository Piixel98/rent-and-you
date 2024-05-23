/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $UserCreateModel = {
    description: `UserCreateModel represents a write model to create a user`,
    properties: {
        document_type: {
    type: 'string',
    isRequired: true,
},
        document_id: {
    type: 'string',
    isRequired: true,
},
        first_name: {
    type: 'string',
    isRequired: true,
},
        last_name: {
    type: 'string',
},
        postal_code: {
    type: 'string',
    isRequired: true,
},
        address: {
    type: 'string',
    isRequired: true,
},
        city: {
    type: 'string',
    isRequired: true,
},
        phone_number: {
    type: 'string',
},
        is_superuser: {
    type: 'boolean',
},
        hashed_password: {
    type: 'string',
},
        email: {
    type: 'string',
    isRequired: true,
},
    },
} as const;
