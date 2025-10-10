export interface Title {
    page_title: string;
}

export interface Boards extends Title {
    statuses: { [key: string]: string };
    keyword: string;
    record: {
        data: any[];
        links: any[];
    };
}

export interface Tasks extends Title {
    statuses: { [key: string]: string };
    keyword: string;
    record: {
        data: any[];
        links: any[];
    };
}