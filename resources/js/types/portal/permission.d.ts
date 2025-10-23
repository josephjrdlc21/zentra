export interface Title {
    page_title: string;
}

export interface Permissions extends Title {
    keyword: string;
    record: {
        data: any[];
        links: any[];
    };
}