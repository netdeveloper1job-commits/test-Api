export declare class CreateComplianceTrackerDto {
    locationId: number;
    complianceConfigId: number;
    userId: number;
    dueDate: Date;
    status: string;
    activity: string;
    doc?: string;
    complianceCompletionDate?: Date;
    complianceCertificate?: string;
    createdBy?: string;
    updatedBy?: string;
}
