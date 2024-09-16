interface IBaseReviewEntity {
    id: number;
    text: string;
    username: string;
    geo: string;
}

export interface IReviewsEntity extends IBaseReviewEntity {
    title: string;
}

export interface ITrustpilotReviewEntity extends IBaseReviewEntity {}
