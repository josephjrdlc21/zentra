export interface Title {
    page_title: string;
}

export interface Dashboard extends Title {
    record: {
        pending_tasks: number;
        completed_tasks: number;
        in_progress_tasks: number;
        total_tasks: number;
        latest_tasks: Array<any>;
    }
}