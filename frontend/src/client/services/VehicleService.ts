/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { VehicleCreateModel } from '../models/VehicleCreateModel';
import type { VehicleReadModel } from '../models/VehicleReadModel';
import type { VehicleUpdateModel } from '../models/VehicleUpdateModel';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class VehicleService {

    /**
     * Get Vehicles
     * @returns VehicleReadModel Successful Response
     * @throws ApiError
     */
    public static getVehiclesApiV1VehiclesGet({
officeId,
offset,
limit = 100,
}: {
officeId?: number,
offset?: number,
limit?: number,
}): CancelablePromise<Array<VehicleReadModel>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/vehicles/',
            query: {
                'office_id': officeId,
                'offset': offset,
                'limit': limit,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Create Vehicle
     * @returns VehicleReadModel Successful Response
     * @throws ApiError
     */
    public static createVehicleApiV1VehiclesPost({
requestBody,
}: {
requestBody: VehicleCreateModel,
}): CancelablePromise<VehicleReadModel> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/vehicles/',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                409: `Conflict`,
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get Vehicle
     * @returns VehicleReadModel Successful Response
     * @throws ApiError
     */
    public static getVehicleApiV1VehiclesIdGet({
id,
}: {
id: number,
}): CancelablePromise<VehicleReadModel> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/vehicles/{id_}/',
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
     * Delete Vehicle
     * @returns VehicleReadModel Successful Response
     * @throws ApiError
     */
    public static deleteVehicleApiV1VehiclesIdDelete({
id,
}: {
id: number,
}): CancelablePromise<VehicleReadModel> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/vehicles/{id_}/',
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
     * Update Vehicle
     * @returns VehicleReadModel Successful Response
     * @throws ApiError
     */
    public static updateVehicleApiV1VehiclesIdPatch({
id,
requestBody,
}: {
id: number,
requestBody: VehicleUpdateModel,
}): CancelablePromise<VehicleReadModel> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/v1/vehicles/{id_}/',
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
