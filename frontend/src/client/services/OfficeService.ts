/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { OfficeCreateModel } from '../models/OfficeCreateModel';
import type { OfficeReadModel } from '../models/OfficeReadModel';
import type { OfficeUpdateModel } from '../models/OfficeUpdateModel';
import type { VehicleReadModel } from '../models/VehicleReadModel';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class OfficeService {

    /**
     * Get Offices
     * @returns OfficeReadModel Successful Response
     * @throws ApiError
     */
    public static getOfficesApiV1OfficesGet({
city,
offset,
limit = 100,
}: {
city?: string,
offset?: number,
limit?: number,
}): CancelablePromise<Array<OfficeReadModel>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/offices/',
            query: {
                'city': city,
                'offset': offset,
                'limit': limit,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Create Office
     * @returns OfficeReadModel Successful Response
     * @throws ApiError
     */
    public static createOfficeApiV1OfficesPost({
requestBody,
}: {
requestBody: OfficeCreateModel,
}): CancelablePromise<OfficeReadModel> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/offices/',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                409: `Conflict`,
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get Office
     * @returns OfficeReadModel Successful Response
     * @throws ApiError
     */
    public static getOfficeApiV1OfficesIdGet({
id,
}: {
id: number,
}): CancelablePromise<OfficeReadModel> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/offices/{id_}/',
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
     * Delete Office
     * @returns OfficeReadModel Successful Response
     * @throws ApiError
     */
    public static deleteOfficeApiV1OfficesIdDelete({
id,
}: {
id: number,
}): CancelablePromise<OfficeReadModel> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/offices/{id_}/',
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
     * Update Office
     * @returns OfficeReadModel Successful Response
     * @throws ApiError
     */
    public static updateOfficeApiV1OfficesIdPatch({
id,
requestBody,
}: {
id: number,
requestBody: OfficeUpdateModel,
}): CancelablePromise<OfficeReadModel> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/v1/offices/{id_}/',
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
     * Get Office Vehicles Available
     * @returns VehicleReadModel Successful Response
     * @throws ApiError
     */
    public static getOfficeVehiclesAvailableApiV1OfficesOfficeIdVehiclesAvailableGet({
officeId,
pickupDate,
returnDate,
offset,
limit = 100,
}: {
officeId: number,
pickupDate?: string,
returnDate?: string,
offset?: number,
limit?: number,
}): CancelablePromise<Array<VehicleReadModel>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/offices/{office_id}/vehicles/available/',
            path: {
                'office_id': officeId,
            },
            query: {
                'pickup_date': pickupDate,
                'return_date': returnDate,
                'offset': offset,
                'limit': limit,
            },
            errors: {
                404: `Not Found`,
                422: `Validation Error`,
            },
        });
    }

}
