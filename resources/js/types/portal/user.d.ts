export interface Title {
    page_title: string;
}

export interface User extends Title {
    user: {
        id: number; 
        name: string;
        email: string;
        source: null | string;
        filename: null | string;
        path: null | string;
        directory: null | string;
    };
}

export interface Users extends Title {
    statuses: { [key: string]: string };
    keyword: string;
    record: {
        data: any[];
        links: any[];
    };
}