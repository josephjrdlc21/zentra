export interface Title {
    page_title: string;
}

export interface Audits extends Title {
    keyword: string;
    record: {
        data: any[];
        links: any[];
    };
}