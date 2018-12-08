import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class TodoService {
    public baseUrl = "http://13.124.206.64:3000"
    public httpOptions = {
        headers: new HttpHeaders({
            'X-Cardoc-User': 'gman'
        })
    };
    constructor(private http: HttpClient) {
    }

    public getList(sortType?) {
        if (sortType === 'content') {
            return this.http.get(this.baseUrl + '/todos', this.httpOptions)
                .pipe(map(
                    (data: Array<any>) => data.sort((a, b) => ('' + a.content).localeCompare(b.content))
                ))
        }

        if (sortType === 'date') {
            return this.http.get(this.baseUrl + '/todos', this.httpOptions)
                .pipe(
                    map((data: Array<any>) => data.sort((a, b) => {
                        const date1 = new Date(a.updatedAt);
                        const date2 = new Date(b.updatedAt);
                        return date2.getTime() - date1.getTime();
                    })
                    ))
        }

        return this.http.get(this.baseUrl + '/todos', this.httpOptions);
    }

    public removeTask(sId) {
        return this.http.delete(this.baseUrl + '/todos/' + sId, this.httpOptions);
    }

    public addTask(content) {
        return this.http.post(this.baseUrl + '/todos', content, this.httpOptions);
    }

    public completeTask(sId, data) {
        return this.http.put(this.baseUrl + '/todos/' + sId, data, this.httpOptions);
    }

    public updateTask(sId, data) {
        return this.http.put(this.baseUrl + '/todos/' + sId, data, this.httpOptions);
    }

    public changeTaskSequence(sId, data) {
        return this.http.post(this.baseUrl + '/todos/' + sId + '/arrangement', data, this.httpOptions);
    }
}