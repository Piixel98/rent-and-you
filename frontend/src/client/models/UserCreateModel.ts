/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { UserRole } from './UserRole';

/**
 * UserCreateModel represents a write model to create a user
 */
export type UserCreateModel = {
    document_type: string;
    document_id: string;
    first_name: string;
    last_name?: string;
    postal_code: string;
    address: string;
    city: string;
    phone_number?: string;
    role: UserRole;
    hashed_password?: string;
    email: string;
};
