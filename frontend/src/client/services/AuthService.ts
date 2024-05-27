/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AuthBaseModel } from '../models/AuthBaseModel';
import type { Body_auth_signin_api_v1_auth_signin_post } from '../models/Body_auth_signin_api_v1_auth_signin_post';
import type { RentReadModel } from '../models/RentReadModel';
import type { UserCreateModel } from '../models/UserCreateModel';
import type { UserReadModel } from '../models/UserReadModel';
import type { UserUpdateModel } from '../models/UserUpdateModel';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class AuthService {

    /**
     * Auth Signin
     * @returns AuthBaseModel Successful Response
     * @throws ApiError
     */
    public static authSigninApiV1AuthSigninPost({
formData,
}: {
formData: Body_auth_signin_api_v1_auth_signin_post,
}): CancelablePromise<AuthBaseModel> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/auth/signin',
            formData: formData,
            mediaType: 'application/x-www-form-urlencoded',
            errors: {
                400: `Bad Request`,
                422: `Validation Error`,
            },
        });
    }

    /**
     * Auth Signup
     * @returns UserReadModel Successful Response
     * @throws ApiError
     */
    public static authSignupApiV1AuthSignupPost({
requestBody,
}: {
requestBody: UserCreateModel,
}): CancelablePromise<UserReadModel> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/auth/signup',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                409: `Conflict`,
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get User Me
     * @returns UserReadModel Successful Response
     * @throws ApiError
     */
    public static getUserMeApiV1AuthUserGet(): CancelablePromise<UserReadModel> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/auth/user',
            errors: {
                400: `Bad Request`,
            },
        });
    }

    /**
     * Update User Me
     * @returns UserReadModel Successful Response
     * @throws ApiError
     */
    public static updateUserMeApiV1AuthUserPatch({
requestBody,
}: {
requestBody: UserUpdateModel,
}): CancelablePromise<UserReadModel> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/v1/auth/user',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get User Rents
     * @returns RentReadModel Successful Response
     * @throws ApiError
     */
    public static getUserRentsApiV1AuthUserRentsGet(): CancelablePromise<Array<RentReadModel>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/auth/user/rents',
            errors: {
                400: `Bad Request`,
                404: `Not Found`,
            },
        });
    }

}
