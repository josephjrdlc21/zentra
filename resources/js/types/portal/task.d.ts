export interface Title {
    page_title: string;
}

export interface Boards extends Title {
    statuses: { [key: string]: string };
    keyword: string;
    record: {
    }[];
}

export interface Tasks extends Title {
    statuses: { [key: string]: string };
    keyword: string;
    record: {
        data: any[];
        links: any[];
    };
}

export interface Task extends Title {
    projects: { [id: string]: string };
    users: { [id: string]: string };
    tasks: {
        id: number;
        assigned: any;
        project: any;
        name: string;
        priority: string;
        status: string;
        start_date: string;
        end_date: string;
        created_at: string;
    }
}