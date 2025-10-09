export interface Title {
    page_title: string;
}

export interface Project extends Title {
    users: { [id: string]: string };
    project: {
        name: string;
        description: string;
        status: string;
        start_date: string;
        due_date: string;
        members: any[];
        owner: any;
        created_at: string;
        updated_at: string;
    }
}

export interface Projects extends Title {
    keyword: string;
    record: {
        data: any[];
        links: any[];
    };
}