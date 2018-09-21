import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { tap } from 'rxjs/operators/tap';
import { map } from 'rxjs/operators/map';

const CREATE_ACTION = 'create';
const UPDATE_ACTION = 'update';
const REMOVE_ACTION = 'destroy';

@Injectable()
export class EditService extends BehaviorSubject<any[]> {
    constructor(private http: HttpClient) {
        super([]);
    }

    private data: any[] = [];

    public read() {
        if (this.data.length) {
            return super.next(this.data);
        }

        this.fetch()
            .pipe(
                tap(data => {
                    this.data = data;
                })
            )
            .subscribe(data => {
                super.next(data);
            });
    }

    private fetch(action: string = '', data?: any): Observable<any[]> {
        return this.http
            .jsonp(`https://demos.telerik.com/kendo-ui/service/Products/${action}?${this.serializeModels(data)}`, 'callback')
            .pipe(map(res => <any[]>res));
    }

    private serializeModels(data?: any): string {
        return data ? `&models=${JSON.stringify([data])}` : '';
    }
}
