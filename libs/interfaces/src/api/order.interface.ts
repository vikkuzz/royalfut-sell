export namespace CreateOrder {
    export namespace POST {
        export namespace Response {
            export interface IBody {
                "id": number;
                "platform": string;
                "coinsAmount": number;
                "currency": string;
                "mail": string;
                "password": string;
                "backupCode1": string;
                "backupCode2": string;
                "backupCode3": string;
                "backupCode4": string;
                "backupCode5": string;
                "backupCode6": string;
                "status": string;
                "editable": boolean;
                "canPlace": boolean;
                "createdAt": string;
            }
        }
        export namespace Request {
            export interface IBody {
                "platform"?: string;
                "coinsAmount"?: number;
                "currency"?: string;
                "mail"?: string;
                "password"?: string;
                "backupCode1"?: string;
            }
        }
    }
}
export namespace UpdateOrder {
    export namespace PUT {
        export namespace Response {
            export interface IBody {
                "id": number;
                "platform": string;
                "coinsAmount": number;
                "currency": string;
                "mail": string;
                "password": string;
                "backupCode1": string;
                "backupCode2": string;
                "backupCode3": string;
                "backupCode4": string;
                "backupCode5": string;
                "backupCode6": string;
                "status": string;
                "editable": boolean;
                "canPlace": boolean;
                "createdAt": string;
            }
        }
        export namespace Request {
            export interface IBody {
                "id": number | undefined;
                "platform": string;
                "coinsAmount": number;
                "currency": string;
                "mail": string;
                "password": string;
                "backupCode1": string;
                "backupCode2"?: string;
                "backupCode3"?: string;
                "backupCode4"?: string;
                "backupCode5"?: string;
                "backupCode6"?: string;
            }
        }
    }
}
