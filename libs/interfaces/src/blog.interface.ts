export interface IWidget {
    color?: string;
    text?: string;
}

export interface IButton {
    id: number;
    text: string;
    color: string;
    route: string;
}

export interface ICard {
    slug: string;
    width: number | string;
    date: string;
    time: string;
    title: string;
    body1?: any;
    body2?: any;
    tags: Array<string>;
    widgets?: Array<IWidget> | null;
    pic1?: string;
    pic2?: string;
    cover?: string;
    buttons?: Array<IButton>;
}
export interface ITag {
    text: string;
    slug: string;
    active: boolean;
}
