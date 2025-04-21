import { HttpClient } from "@angular/common/http";
import { catchError, Observable, of, tap } from "rxjs";
import { PagedData } from "../models/commons/paged-data";
import { DateRange } from "../models/commons/date-range";
import { LocalstorageService } from "./local-storage.service";
import { MessageService } from "primeng/api";

export abstract class GenericGlobalService<TRequest, TResponse> {

    genericObjectName: string;
    apiBaseUrl: string;

    constructor(public http: HttpClient,
        public localStorageService: LocalstorageService,
        public messageService: MessageService,
        genericObjectName: string,
        apiBaseUrl: string,) {
        this.genericObjectName = genericObjectName;
        this.apiBaseUrl = apiBaseUrl;
    }

    createInstance<T>(type: new () => T): T {
        return new type();
    }

    getAll(): Observable<TResponse[]> {
        const cachedData = this.localStorageService.getItem(`${this.genericObjectName}List`);
        if (cachedData) {
            return of(cachedData);
        }

        return this.http.get<TResponse[]>(`${this.apiBaseUrl}/${this.genericObjectName}/GetAll`)
            .pipe(
                tap(data => this.localStorageService.setItem(`${this.genericObjectName}List`, data)),
                catchError(error => this.handleError<TResponse[]>(error))
            );
    }

    getById(id: number): Observable<TResponse> {
        const cachedData = this.localStorageService.getItem(`${this.genericObjectName}List`);
        if (cachedData) {
            const item = cachedData.find((x: any) => x.id === id);
            if (item) {
                return of(item);
            }
        }

        return this.http.get<TResponse>(`${this.apiBaseUrl}/${this.genericObjectName}/GetByIntId/${id}`)
            .pipe(
                tap(response => {
                    if (cachedData) {
                        cachedData.push(response);
                        this.localStorageService.setItem(`${this.genericObjectName}List`, cachedData);
                    }
                }),
                catchError(error => this.handleError<TResponse>(error))
            );
    }

    getByTerms(terms: string): Observable<TResponse[]> {
        return this.http.get<TResponse[]>(this.apiBaseUrl + '/' + this.genericObjectName + '/GetByTerms/' + terms);
    }

    getByQueryParameters(searchText: any, pageIndex: any, sortBy: any, sortDirection: any, pageSize: any) {
        return this.http.get<PagedData<TResponse>>(this.apiBaseUrl + '/' + this.genericObjectName + '/GetByQueryParameters?searchText=' + searchText + '&PageIndex=' + pageIndex + '&SortBy=' + sortBy + '&SortDirection=' + sortDirection + '&PageSize=' + pageSize);
    }

    getByDateRangeRequest(dateRange: DateRange): Observable<TResponse> {
        return this.http.post<TResponse>(this.apiBaseUrl + '/' + this.genericObjectName + '/GetByDateRangeRequest', dateRange);
    }

    protected handleError<T>(error: any): Observable<T> {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message, life: 3000 });
        return of(error as T);
    }
}