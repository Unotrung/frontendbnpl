export interface City {
    id: string;
    code: string;
    name: string;
    districts: District[];
}

export interface District {
    id: string;
    name: string;
    code: string;
    wards: any[];
    streets: any[];
    projects: any[];
}

export interface Ward {
    id: string;
    name: string;
    prefix: string;
}

export interface Street {
    id: string;
    name: string;
    prefix: string;
}