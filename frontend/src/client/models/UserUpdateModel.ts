/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { UserRole } from './UserRole';

/**
 * UserUpdateModel represents a write model to update a user
 */
export type UserUpdateModel = {
    document_type?: string;
    document_id?: string;
    first_name?: string;
    last_name?: string;
    postal_code?: string;
    address?: string;
    city?: string;
    phone_number?: string;
    role?: UserRole;
    hashed_password?: string;
    email?: string;
    is_active?: boolean;
    is_deleted?: boolean;
};
