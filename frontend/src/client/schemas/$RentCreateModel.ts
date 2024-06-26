/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $RentCreateModel = {
    description: `RentCreateModel represents a write model to create a rent`,
    properties: {
        amount: {
    type: 'number',
    isRequired: true,
},
        total_days: {
    type: 'number',
    isRequired: true,
},
        pickup_date: {
    type: 'string',
    isRequired: true,
    format: 'date-time',
},
        return_date: {
    type: 'string',
    isRequired: true,
    format: 'date-time',
},
        office_id: {
    type: 'number',
    isRequired: true,
},
        vehicle_id: {
    type: 'number',
    isRequired: true,
},
        user_id: {
    type: 'number',
    isRequired: true,
},
    },
} as const;
