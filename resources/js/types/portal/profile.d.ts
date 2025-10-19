export interface Title {
    page_title: string;
}

export interface Profile extends Title {
    profile: {
        id: number; 
        name: string;
        email: string;
        status: string;
        source: null | string;
        filename: null | string;
        path: null | string;
        directory: null | string;
        created_at: string;
        updated_at: string;
    },
    password: string;
    current_password: string;
    password_confirmation: string;
}