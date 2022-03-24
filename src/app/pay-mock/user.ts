export interface User {
    id?: string
    phone?: string,
    citizenId?: string,
    accessToken?: string,
    isPhoneExist?: boolean,
    pin?: string,
    otp?: string,
    name: string,
    creditLimit: number
}

export enum InputType {
    number,
    name
}
