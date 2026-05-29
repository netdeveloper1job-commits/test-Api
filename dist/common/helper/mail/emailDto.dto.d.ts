export declare class EmailDto {
    content: {
        [key: string]: string;
    };
    to: string;
    reqData: string;
    userEmail?: string;
}
export declare class InvoiceEmailDto {
    content: string;
    to: string;
    reqData: string;
    salesPersonMailId?: string;
}
