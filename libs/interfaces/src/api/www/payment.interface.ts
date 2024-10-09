/* eslint-disable @typescript-eslint/naming-convention */

export namespace Payment {
    export namespace PrepareModule {
        export namespace POST {
            export namespace Response {
                /*
                export interface IModuleBankEntity {
                    acquiringLink: string;
                    merchant: string;
                    amount: string;
                    order_id: string;
                    description: string;
                    client_email: string;
                    receipt_contact: string;
                    success_url: string;
                    testing: string;
                    callback_url: string;
                    unix_timestamp: string;
                    receipt_items: string;
                    signature: string;
                }
                */
                export interface Body {
                    id: number;
                    status: "WAITING_PAYMENT" | string;
                    acquiringLink: string;
                }

                export type FailureBody =
                    | {
                          code: {
                              type: "MissingOrInvalidCredentialsCode" | string;
                          };
                      }
                    | {
                          errors:
                              | {
                                    restrictedPrepayOperation: Array<string>;
                                }
                              | {
                                    missingOrderForUser: Array<string>;
                                };
                      };
            }

            export namespace Request {
                export interface Body {
                    successUrl: string;
                    failUrl: string;
                }
            }
        }
    }
}
