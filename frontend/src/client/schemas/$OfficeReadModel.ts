/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $OfficeReadModel = {
    description: `OfficeReadModel represents data structure as a read model`,
    properties: {
        name: {
    type: 'string',
    isRequired: true,
},
        phone: {
    type: 'string',
    isRequired: true,
},
        address: {
    type: 'string',
    isRequired: true,
},
        postal_code: {
    type: 'string',
    isRequired: true,
},
        city: {
    type: 'string',
    isRequired: true,
},
        geo_location: {
    type: 'string',
},
        email: {
    type: 'string',
    isRequired: true,
},
        id_: {
    type: 'number',
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
