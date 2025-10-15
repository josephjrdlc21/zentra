export interface Title {
    page_title: string;
}

export interface Reports extends Title {
    statuses: { [key: string]: string };
    keyword: string;
    record: {
        data: any[];
        links: any[];
    };
}