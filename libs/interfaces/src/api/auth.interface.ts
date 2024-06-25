interface IUserBody {
    email: string;
    username: string;
    createdAt: string;
    updatedAt: string;
    userLocale: string;
    profilePicture: number;
    token: string;
}

export namespace FastLogin {
    export namespace POST {
        export namespace Response {
            export interface IBody {
                user: IUserBody;
            }
        }

        export namespace Request {
            export interface IBody {
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
            export interface IBody {
                user: IUserBody;
            }
        }

        export namespace Request {
            export interface IBody {
                user: {
                    loginToken: string;
                };
            }
        }
    }
}
