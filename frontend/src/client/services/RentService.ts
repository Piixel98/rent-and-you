/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { RentCreateModel } from '../models/RentCreateModel';
import type { RentReadModel } from '../models/RentReadModel';
import type { RentUpdateModel } from '../models/RentUpdateModel';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class RentService {

    /**
     * Get Rents
     * @returns RentReadModel Successful Response
     * @throws ApiError
     */
    public static getRentsApiV1RentsGet({
userId,
offset,
limit = 100,
}: {
userId?: number,
offset?: number,
limit?: number,
}): CancelablePromise<Array<RentReadModel>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/rents/',
            query: {
                'user_id': userId,
                'offset': offset,
                'limit': limit,
            },
            errors: {
                404: `Not Found`,
                422: `Validation Error`,
            },
        });
    }

    /**
     * Create Rent
     * @returns RentReadModel Successful Response
     * @throws ApiError
     */
    public static createRentApiV1RentsPost({
requestBody,
}: {
requestBody: RentCreateModel,
}): CancelablePromise<RentReadModel> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/rents/',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                409: `Conflict`,
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get Rent
     * @returns RentReadModel Successful Response
     * @throws ApiError
     */
    public static getRentApiV1RentsIdGet({
id,
}: {
id: number,
}): CancelablePromise<RentReadModel> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/rents/{id_}/',
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
     * Delete Rent
     * @returns RentReadModel Successful Response
     * @throws ApiError
     */
    public static deleteRentApiV1RentsIdDelete({
id,
}: {
id: number,
}): CancelablePromise<RentReadModel> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/rents/{id_}/',
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
     * Update Rent
     * @returns RentReadModel Successful Response
     * @throws ApiError
     */
    public static updateRentApiV1RentsIdPatch({
id,
requestBody,
}: {
id: number,
requestBody: RentUpdateModel,
}): CancelablePromise<RentReadModel> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/v1/rents/{id_}/',
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
