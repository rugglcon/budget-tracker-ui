export interface LoginSuccess {
    token: string,
    userName: string,
    id: number,
    email: string
}

export interface NewUser {
    userName: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}
