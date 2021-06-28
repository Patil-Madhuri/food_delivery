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
    url = environment.apiUrl;

    urls = {
        getItems: 'items/',
        addorder: 'order',
        deleteItem: '/api/v1/items/'
    };
    get currentDate() {
        return new Date();
    }
    constructor(
        private http: HttpClient
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        if (!req.url.includes('http://localhost:8080')) {
            const dubReq = req.clone({
                url: this.url + req.url
            });
            return next.handle(dubReq);
        } else {
            const dubReq = req.clone({
                url: req.url
            });
            return next.handle(dubReq);
        }
    }


    getAllItems(type) {
        return this.http.get(this.urls.getItems + type)
    }
    addOrder(payload) {
        return this.http.post(this.urls.addorder, payload)
    }
}

