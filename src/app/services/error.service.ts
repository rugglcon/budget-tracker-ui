import { Injectable } from '@angular/core';
import { JSErrorResource } from '../resources/error.resource';

@Injectable()
export class JSErrorService {
    constructor(private errorResource: JSErrorResource) {}

    reportError(stackTrace: string): Promise<void> {
        return this.errorResource.reportError({stackTrace});
    }
}
