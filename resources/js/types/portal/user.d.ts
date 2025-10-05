export interface User {
    page_title: string;
}

export interface Users {
    page_title: string;
    statuses: { [key: string]: string };
    keyword: string;
    selected_status: string;
    start_date: string;
    end_date: string;
    record: {
        data: any[];
        links: any[];
    };
}