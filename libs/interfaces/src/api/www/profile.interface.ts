/* eslint-disable @typescript-eslint/naming-convention */

import type { ICoinOrderTransactionData } from "../../order.interface";
import type { ETimePeriod } from "@royalfut/enums";

export namespace Profile {
    export namespace Order {
        export namespace GET {
            export namespace Response {
                export interface Body {
                    orders: Array<ICoinOrderTransactionData>;
                    groups: Record<
                        ETimePeriod,
                        Array<ICoinOrderTransactionData>
                    >;
                    total: number;
                    page: number;
                    limit: number;
                }
            }
        }
    }
}
