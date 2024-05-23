/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BodyType } from './BodyType';
import type { Brand } from './Brand';
import type { Fares } from './Fares';
import type { GearBox } from './GearBox';

export type VehicleReadModel = {
    model?: string;
    version?: string;
    color?: string;
    brand?: Brand;
    kms?: number;
    license_plate?: string;
    purchase_date?: string;
    gearbox?: GearBox;
    body_type?: BodyType;
    price_per_day?: number;
    passengers?: number;
    avg_consumption?: number;
    fare?: Fares;
    image_url?: string;
    office_id?: number;
    id_: number;
    created_at: string;
    updated_at: string;
};
