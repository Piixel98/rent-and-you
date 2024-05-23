/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $VehicleUpdateModel = {
    properties: {
        model: {
    type: 'string',
},
        version: {
    type: 'string',
},
        color: {
    type: 'string',
},
        brand: {
    type: 'Brand',
},
        kms: {
    type: 'number',
},
        license_plate: {
    type: 'string',
},
        purchase_date: {
    type: 'string',
    format: 'date',
},
        gearbox: {
    type: 'GearBox',
},
        body_type: {
    type: 'BodyType',
},
        price_per_day: {
    type: 'number',
},
        passengers: {
    type: 'number',
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
},
        is_deleted: {
    type: 'boolean',
},
    },
} as const;
