export interface IWithdraw {
    wallet: string | null;
    balance: number;
    locked: number;
    pending: number;
    paid: number;
}
