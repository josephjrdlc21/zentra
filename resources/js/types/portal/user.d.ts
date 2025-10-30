export interface Title {
    page_title: string;
}

export interface User extends Title {
    user: {
        id: number; 
        name: string;
        email: string;
        status: string;
        source: null | string;
        filename: null | string;
        path: null | string;
        directory: null | string;
        created_at: string;
        updated_at: string;
        roles: {
            id: number;
            name: string;
        }[];
    };
    roles: {
        id: number;
        name: string;
    }[];
}

export interface Users extends Title {
    statuses: { [key: string]: string };
    keyword: string;
    record: {
        data: any[];
        links: any[];
    };
}