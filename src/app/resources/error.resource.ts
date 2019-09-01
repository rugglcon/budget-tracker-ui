import { Injectable } from '@angular/core';
import { Config } from '../config';
import { JSError } from '../models/js-error.model';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class JSErrorResource {
    private url = Config.baseUrl;

    constructor(private http: HttpClient) {}

    reportError(err: JSError): Promise<void> {
        return this.http.post<void>(this.url + '/log-js-error', err).toPromise();
    }
}
