export interface Title {
    page_title: string;
}

export interface Project extends Title {
    
}

export interface Projects extends Title {
    keyword: string;
    record: {
        data: any[];
        links: any[];
    };
}