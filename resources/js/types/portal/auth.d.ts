export interface Auth {
    page_title: string;
}

export interface Verif extends Auth {
    verify: {
        id: number; 
        token: string;
        email: string;
        password: string;
        password_confirmation: string;
    };

    password: {
        token: string;
    }
}