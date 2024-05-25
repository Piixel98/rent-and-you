/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AuthBaseModel } from '../models/AuthBaseModel';
import type { Body_login_access_token_api_v1_auth_login_access_token_post } from '../models/Body_login_access_token_api_v1_auth_login_access_token_post';
import type { UserReadModel } from '../models/UserReadModel';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class AuthService {

    /**
     * Login Access Token
     * @returns AuthBaseModel Successful Response
     * @throws ApiError
     */
    public static loginAccessTokenApiV1AuthLoginAccessTokenPost({
formData,
}: {
formData: Body_login_access_token_api_v1_auth_login_access_token_post,
}): CancelablePromise<AuthBaseModel> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/auth/login/access-token',
            formData: formData,
            mediaType: 'application/x-www-form-urlencoded',
            errors: {
                400: `Bad Request`,
                422: `Validation Error`,
            },
        });
    }

    /**
     * Password Recovery
     * @returns any Successful Response
     * @throws ApiError
     */
    public static passwordRecoveryApiV1AuthPasswordRecoveryEmailPost({
email,
}: {
email: string,
}): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/auth/password-recovery/{email}',
            path: {
                'email': email,
            },
            errors: {
                400: `Bad Request`,
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get User Me
     * @returns UserReadModel Successful Response
     * @throws ApiError
     */
    public static getUserMeApiV1AuthUserMeGet({
args,
kwargs,
}: {
args: any,
kwargs: any,
}): CancelablePromise<UserReadModel> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/auth/user/me',
            query: {
                'args': args,
                'kwargs': kwargs,
            },
            errors: {
                400: `Bad Request`,
                422: `Validation Error`,
            },
        });
    }

}
