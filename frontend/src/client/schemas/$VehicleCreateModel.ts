/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $VehicleCreateModel = {
    properties: {
        model: {
    type: 'string',
    isRequired: true,
},
        version: {
    type: 'string',
    isRequired: true,
},
        color: {
    type: 'string',
    isRequired: true,
},
        brand: {
    type: 'Brand',
    isRequired: true,
},
        kms: {
    type: 'number',
    isRequired: true,
},
        license_plate: {
    type: 'string',
    isRequired: true,
},
        purchase_date: {
    type: 'string',
    isRequired: true,
    format: 'date',
},
        gearbox: {
    type: 'GearBox',
    isRequired: true,
},
        body_type: {
    type: 'BodyType',
    isRequired: true,
},
        price_per_day: {
    type: 'number',
    isRequired: true,
},
        passengers: {
    type: 'number',
    isRequired: true,
},
        avg_consumption: {
    type: 'number',
},
        fare: {
    type: 'Fares',
},
        image_url: {
    type: 'string',
},
        office_id: {
    type: 'number',
    isRequired: true,
},
    },
} as const;
