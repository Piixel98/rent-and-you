/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $UserUpdateModel = {
    description: `UserUpdateModel represents a write model to update a user`,
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
        role: {
    type: 'UserRole',
},
        hashed_password: {
    type: 'string',
},
        email: {
    type: 'string',
},
        is_active: {
    type: 'boolean',
},
        is_deleted: {
    type: 'boolean',
},
    },
} as const;
