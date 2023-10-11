export enum Methodology {
    AGILE = 'Agile',
    WATERFALL = 'Waterfall',
}

export interface IProduct {
    productId: number;
    productName: string;
    productOwnerName: string;
    Developers: string[];
    scrumMasterName: string;
    startDate: string;
    methodology: Methodology;
    location: string;
}
