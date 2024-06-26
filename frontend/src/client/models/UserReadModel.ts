/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { DocumentType } from './DocumentType';
import type { UserRole } from './UserRole';

/**
 * UserReadModel represents data structure as a read model
 */
export type UserReadModel = {
    document_type?: DocumentType;
    document_id?: string;
    expiration_date?: string;
    birth_date?: string;
    first_name?: string;
    last_name?: string;
    postal_code?: string;
    address?: string;
    city?: string;
    phone_number?: string;
    role?: UserRole;
    hashed_password?: string;
    email?: string;
    id_?: number;
    is_active?: boolean;
    is_deleted?: boolean;
    created_at?: string;
    updated_at?: string;
};
