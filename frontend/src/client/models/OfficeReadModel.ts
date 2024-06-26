/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * OfficeReadModel represents data structure as a read model
 */
export type OfficeReadModel = {
    name: string;
    phone: string;
    address: string;
    postal_code: string;
    city: string;
    geo_location?: string;
    email: string;
    id_: number;
    is_deleted: boolean;
    created_at: string;
    updated_at: string;
    rents?: Array<number>;
};
