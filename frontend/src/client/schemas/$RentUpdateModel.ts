/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $RentUpdateModel = {
    description: `RentUpdateModel represents a write model to update a rent`,
    properties: {
        id_: {
    type: 'number',
    isRequired: true,
},
        amount: {
    type: 'number',
},
        total_days: {
    type: 'number',
},
        is_active: {
    type: 'boolean',
},
        is_deleted: {
    type: 'boolean',
},
    },
} as const;
