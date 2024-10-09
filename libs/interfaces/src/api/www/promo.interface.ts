/* eslint-disable @typescript-eslint/naming-convention */

export namespace Promo {
    export namespace CheckPromCode {
        export namespace POST {
            export namespace Response {
                export interface Body {
                    id: number;
                    value: string;
                    discount: number;
                    error?: string;
                }
            }

            export namespace Request {
                export interface Body {
                    promoCode: string;
                    coinsCount: number;
                }
            }
        }
    }
}
