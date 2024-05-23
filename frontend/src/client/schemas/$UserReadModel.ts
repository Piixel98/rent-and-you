/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $UserReadModel = {
    description: `UserReadModel represents data structure as a read model`,
    properties: {
        document_type: {
    type: 'string',
},
        document_id: {
    type: 'string',
},
        first_name: {
    type: 'string',
},
        last_name: {
    type: 'string',
},
        postal_code: {
    type: 'string',
},
        address: {
    type: 'string',
},
        city: {
    type: 'string',
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
},
        id_: {
    type: 'number',
},
        is_active: {
    type: 'boolean',
    isRequired: true,
},
        is_deleted: {
    type: 'boolean',
    isRequired: true,
},
        created_at: {
    type: 'string',
    isRequired: true,
    format: 'date-time',
},
        updated_at: {
    type: 'string',
    isRequired: true,
    format: 'date-time',
},
        rents: {
    type: 'array',
    contains: {
    type: 'number',
},
},
    },
} as const;
