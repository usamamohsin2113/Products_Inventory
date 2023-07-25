import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { InitInterceptor } from "./init.interceptor";

export const HttpInterceptorProviders = [

    {
        provide: HTTP_INTERCEPTORS,
        useClass: InitInterceptor,
        multi: true
    }
];