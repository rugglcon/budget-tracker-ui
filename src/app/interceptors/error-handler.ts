import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { JSErrorService } from '../services/error.service';

@Injectable()
export class JSErrorHandler implements ErrorHandler {
    constructor(private injector: Injector) {}

    handleError(error: any) {
        const errorService = this.injector.get<JSErrorService>(JSErrorService);
        errorService.reportError((error.message ? error.message : error.toString()) + ' ' + error.stack);
    }
}
