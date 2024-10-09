/* eslint-disable @typescript-eslint/naming-convention */

import { ECCYIDs } from "@royalfut/enums";

export namespace CreateOrder {
    export namespace POST {
        export namespace Response {
            export interface Body {
                id: number;
                platform: string;
                coinsAmount: number;
                estimatedPrice: number;
                currency: ECCYIDs;
                mail: string;
                password: string;
                backupCode1: string;
                backupCode2: string;
                backupCode3: string;
                backupCode4: string;
                backupCode5: string;
                backupCode6: string;
                status: string;
                editable: boolean;
                canPlace: boolean;
                createdAt: string;
                cashback?: number;
                cashbackUsed?: number;
            }
        }
        export namespace Request {
            export interface Body {
                platform?: string;
                coinsAmount?: number;
                currency?: string;
                mail?: string;
                password?: string;
                backupCode1?: string;
            }
        }
    }
}
export namespace UpdateOrder {
    export namespace PUT {
        export namespace Response {
            export interface Body {
                id: number;
                platform: string;
                coinsAmount: number;
                estimatedPrice: number;
                currency: ECCYIDs;
                mail: string;
                password: string;
                backupCode1: string;
                backupCode2: string;
                backupCode3: string;
                backupCode4: string;
                backupCode5: string;
                backupCode6: string;
                status: string;
                editable: boolean;
                canPlace: boolean;
                createdAt: string;
            }
        }
        export namespace Request {
            export interface Body {
                id: number | undefined;
                platform: string;
                coinsAmount: number;
                currency: string;
                mail: string;
                password: string;
                backupCode1: string;
                backupCode2?: string;
                backupCode3?: string;
                backupCode4?: string;
                backupCode5?: string;
                backupCode6?: string;
            }
        }
    }
}
