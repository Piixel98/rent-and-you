/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UserCreateModel } from '../models/UserCreateModel';
import type { UserReadModel } from '../models/UserReadModel';
import type { UserUpdateModel } from '../models/UserUpdateModel';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class UserService {

    /**
     * Get Users
     * @returns UserReadModel Successful Response
     * @throws ApiError
     */
    public static getUsersApiV1UsersGet({
offset,
limit = 100,
}: {
offset?: number,
limit?: number,
}): CancelablePromise<Array<UserReadModel>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: ':8000/api/v1/users/',
            query: {
                'offset': offset,
                'limit': limit,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Create User
     * @returns UserReadModel Successful Response
     * @throws ApiError
     */
    public static createUserApiV1UsersPost({
requestBody,
}: {
requestBody: UserCreateModel,
}): CancelablePromise<UserReadModel> {
        return __request(OpenAPI, {
            method: 'POST',
            url: ':8000/api/v1/users/',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                409: `Conflict`,
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get User
     * @returns UserReadModel Successful Response
     * @throws ApiError
     */
    public static getUserApiV1UsersIdGet({
id,
}: {
id: number,
}): CancelablePromise<UserReadModel> {
        return __request(OpenAPI, {
            method: 'GET',
            url: ':8000/api/v1/users/{id_}/',
            path: {
                'id_': id,
            },
            errors: {
                404: `Not Found`,
                422: `Validation Error`,
            },
        });
    }

    /**
     * Delete User
     * @returns UserReadModel Successful Response
     * @throws ApiError
     */
    public static deleteUserApiV1UsersIdDelete({
id,
}: {
id: number,
}): CancelablePromise<UserReadModel> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: ':8000/api/v1/users/{id_}/',
            path: {
                'id_': id,
            },
            errors: {
                404: `Not Found`,
                422: `Validation Error`,
            },
        });
    }

    /**
     * Update User
     * @returns UserReadModel Successful Response
     * @throws ApiError
     */
    public static updateUserApiV1UsersIdPatch({
id,
requestBody,
}: {
id: number,
requestBody: UserUpdateModel,
}): CancelablePromise<UserReadModel> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: ':8000/api/v1/users/{id_}/',
            path: {
                'id_': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                404: `Not Found`,
                422: `Validation Error`,
            },
        });
    }

}
