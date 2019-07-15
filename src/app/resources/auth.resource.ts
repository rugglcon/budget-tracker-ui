import { HttpClient } from '@angular/common/http';
import { Config } from '../config';
import { Injectable } from '@angular/core';
import { NewUser } from '../models/login-success.model';
import { Credentials } from '../models/credentials.model';
import { TokenResponse } from '../services/auth.service';

@Injectable()
export class AuthResource {
    private url = Config.baseUrl + '/user';
    constructor(private http: HttpClient) {
    }

    login(credentials: Credentials): Promise<TokenResponse> {
        return this.http.post<TokenResponse>(this.url + '/login', credentials).toPromise();
    }

    logout(): Promise<void> {
        return this.http.post<void>(this.url + '/logout', null).toPromise();
    }

    signup(credentials: NewUser): Promise<TokenResponse> {
        return this.http.post<TokenResponse>(this.url, credentials).toPromise();
    }
}
