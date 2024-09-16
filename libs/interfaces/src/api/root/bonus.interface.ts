/* eslint-disable @typescript-eslint/naming-convention */

import type { IBonusLevelEntity } from "../../bonus.interface";

export namespace Bonus {
    export namespace Info {
        export namespace GET {
            export namespace Response {
                export interface Body {
                    userId: number;
                    level: number;
                    totalCashback: number;
                    summaryOrdersPrice: number;
                    orderedCoins: number;
                    ordersCount: number;
                    cashbackPercent: number;
                    bonusPartPercent: number;
                }
            }
        }
    }

    export namespace Levels {
        export namespace GET {
            export namespace Response {
                export type Body = Array<IBonusLevelEntity>;
            }
        }
    }
}
