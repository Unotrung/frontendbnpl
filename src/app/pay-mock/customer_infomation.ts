interface CustomerInformation {
    personal_information: {
        name?: string;
        sex?: string;
        phone?: number;
        birthday?: Date;
        citizenId?: number;
        issueDate?: Date;

        city: string;
        district: string;
        ward: string;
        street: string;
}
    reference_information: {
        personal_title: string;
        name: string;
        phone: number;
    }

}