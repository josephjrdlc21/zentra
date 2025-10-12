export interface Title {
    page_title: string;
}

export interface Boards extends Title {
    statuses: { [key: string]: string };
    keyword: string;
    record: {
        current_page: string | number;
        data: any[];
        links: any[];
        next_page_url: string | null;
        prev_page_url: string | null;
        last_page: string | number;
        total: string | number;
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