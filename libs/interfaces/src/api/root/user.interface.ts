/* eslint-disable @typescript-eslint/naming-convention */

export namespace User {
    export namespace Update {
        export namespace PUT {
            export namespace Response {
                export interface Body {
                    user: {
                        profilePicture: number;
                        email: string;
                        username: string;
                    };
                }

                export interface FailureBody {
                    hasError: boolean;
                }
            }

            export namespace Request {
                export interface Body {
                    user: Partial<{
                        profilePicture: number;
                        email: string;
                        username: string;
                    }>;
                }
            }
        }
    }
}
