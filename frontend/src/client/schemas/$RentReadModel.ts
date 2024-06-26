/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $RentReadModel = {
    description: `RentReadModel represents data structure as a read model`,
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
    },
} as const;
