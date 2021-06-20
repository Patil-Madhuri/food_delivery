import { Injectable } from '@angular/core';
import {
    HttpClient,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpHeaders
} from '@angular/common/http';
import { environment } from '../../environments/environment.prod';

@Injectable({
    providedIn: 'root'
})
export class ApiService implements HttpInterceptor {
    // export class ApiService {
    URL = environment.apiUrl;

    urls = {
        getItems: 'items',
        addorder: 'order'
    };
    get currentDate() {
        return new Date();
    }
    constructor(
        private http: HttpClient
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const dubReq = req.clone({
            url: req.url
        });
        return next.handle(dubReq);
    }


    getAllItems() {
        return this.http.get(this.urls.getItems)
    }
    addOrder(payload) {
        return this.http.post(this.urls.addorder, payload)
    }
}
