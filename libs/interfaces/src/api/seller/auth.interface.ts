/* eslint-disable @typescript-eslint/naming-convention */

interface IUserBody {
    email: string;
    username: string;
    createdAt: string;
    updatedAt: string;
    userLocale: string;
    profilePicture: number;
    token: string;
    isNewUser: boolean;
}

export namespace FastLogin {
    export namespace POST {
        export namespace Response {
            export interface Body {
                user: IUserBody;
            }
        }

        export namespace Request {
            export interface Body {
                user: {
                    email: string;
                    code: string;
                };
            }
        }
    }
}

export namespace TokenLogin {
    export namespace POST {
        export namespace Response {
            export interface Body {
                user: IUserBody;
            }
        }

        export namespace Request {
            export interface Body {
                user: {
                    loginToken: string;
                };
            }
        }
    }
}
