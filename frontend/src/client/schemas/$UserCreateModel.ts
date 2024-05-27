/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $UserCreateModel = {
    description: `UserCreateModel represents a write model to create a user`,
    properties: {
        document_type: {
    type: 'DocumentType',
    isRequired: true,
},
        document_id: {
    type: 'string',
    isRequired: true,
},
        expiration_date: {
    type: 'string',
    isRequired: true,
    format: 'date',
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
        role: {
    type: 'UserRole',
    isRequired: true,
},
        hashed_password: {
    type: 'string',
    isRequired: true,
},
        email: {
    type: 'string',
    isRequired: true,
},
    },
} as const;
