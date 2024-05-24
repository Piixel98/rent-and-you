/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $OfficeCreateModel = {
    description: `OfficeCreateModel represents a write model to create a office`,
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
    },
} as const;
