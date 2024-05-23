/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * UserReadModel represents data structure as a read model
 */
export type UserReadModel = {
    document_type?: string;
    document_id?: string;
    first_name?: string;
    last_name?: string;
    postal_code?: string;
    address?: string;
    city?: string;
    phone_number?: string;
    is_superuser?: boolean;
    hashed_password?: string;
    email?: string;
    id_?: number;
    is_active: boolean;
    is_deleted: boolean;
    created_at: string;
    updated_at: string;
    rents?: Array<number>;
};
