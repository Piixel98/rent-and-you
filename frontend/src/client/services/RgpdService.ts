/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { RGPDCreateModel } from '../models/RGPDCreateModel';
import type { RGPDReadModel } from '../models/RGPDReadModel';
import type { RGPDUpdateModel } from '../models/RGPDUpdateModel';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class RgpdService {

    /**
     * Get Rgpds
     * @returns RGPDReadModel Successful Response
     * @throws ApiError
     */
    public static getRgpdsApiV1RgpdGet({
userId,
offset,
limit = 100,
}: {
userId?: string,
offset?: number,
limit?: number,
}): CancelablePromise<Array<RGPDReadModel>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/rgpd/',
            query: {
                'user_id': userId,
                'offset': offset,
                'limit': limit,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Create Rgpd
     * @returns RGPDReadModel Successful Response
     * @throws ApiError
     */
    public static createRgpdApiV1RgpdPost({
requestBody,
}: {
requestBody: RGPDCreateModel,
}): CancelablePromise<RGPDReadModel> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/rgpd/',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                409: `Conflict`,
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get Rgpd
     * @returns RGPDReadModel Successful Response
     * @throws ApiError
     */
    public static getRgpdApiV1RgpdIdGet({
id,
}: {
id: number,
}): CancelablePromise<RGPDReadModel> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/rgpd/{id_}/',
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
     * Update Rgpd
     * @returns RGPDReadModel Successful Response
     * @throws ApiError
     */
    public static updateRgpdApiV1RgpdIdPut({
id,
requestBody,
}: {
id: number,
requestBody: RGPDUpdateModel,
}): CancelablePromise<RGPDReadModel> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/rgpd/{id_}/',
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

    /**
     * Delete Rgpd
     * @returns RGPDReadModel Successful Response
     * @throws ApiError
     */
    public static deleteRgpdApiV1RgpdIdDelete({
id,
}: {
id: number,
}): CancelablePromise<RGPDReadModel> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/rgpd/{id_}/',
            path: {
                'id_': id,
            },
            errors: {
                404: `Not Found`,
                422: `Validation Error`,
            },
        });
    }

}
