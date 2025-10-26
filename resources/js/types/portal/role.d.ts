export interface Title {
    page_title: string;
}

export interface Roles extends Title {
    keyword: string;
    record: {
        data: any[];
        links: any[];
    };
}

export interface Role extends Title {
    permissions: {
        id: number;
        name: string;
        description: string;
    }[];
    role: {
        id: number;
        name: string;
        permissions: {
            id: number;
            name: string;
            description: string;
        }[];
    }
}