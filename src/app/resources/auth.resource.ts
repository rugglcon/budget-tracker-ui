import { HttpClient } from '@angular/common/http';
import { Config } from '../config';
import { Injectable } from '@angular/core';
import { LoginSuccess, NewUser } from '../models/login-success.model';
import { Credentials } from '../models/credentials.model';

@Injectable()
export class AuthResource {
    private url = Config.baseUrl + '/user';
    constructor(private http: HttpClient) {
    }

    login(credentials: Credentials): Promise<LoginSuccess> {
        return this.http.post<LoginSuccess>(this.url + '/login', credentials).toPromise().then(data => {
            console.log(data);
            return data;
        });
    }

    signup(credentials: NewUser): Promise<LoginSuccess> {
        return this.http.post<LoginSuccess>(this.url, credentials).toPromise();
    }
}
