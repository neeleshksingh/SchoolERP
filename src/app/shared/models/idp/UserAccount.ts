export class ApplicationUser {
    id?: string;
    userId?:string;
    firstName?: string;
    lastName?: string;
    displayName?: string;
    displayImageUrl?: string;
    userName?: string;
    normalizedUserName?: string;
    email?: string;
    normalizedEmail?: string;
    emailConfirmed?: boolean;
    phoneNumber?: string;
    phoneNumberConfirmed?: boolean;
    twoFactorEnabled?: boolean;
    lockoutEnabled?: boolean;
    accessFailedCount?: number;
    roles?: string[];
    createdBy?: string;
    modifiedBy?: string;
    createdDate?: Date;
    modifiedDate?: Date;
}
