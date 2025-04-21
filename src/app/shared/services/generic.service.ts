import { HttpClient } from "@angular/common/http";
import { catchError, Observable, of, tap } from "rxjs";
import { PagedData } from "../models/commons/paged-data";
import { DateRange } from "../models/commons/date-range";
import { LocalstorageService } from "./local-storage.service";
import { MessageService } from "primeng/api";

export abstract class GenericService<TRequest, TResponse> {

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
            const filteredData = cachedData.filter((item: any) => item != null);
            return of(filteredData);
        }

        return this.http.get<TResponse[]>(`${this.apiBaseUrl}/${this.genericObjectName}/GetAll`)
            .pipe(
                tap(data => {
                    const validData = data.filter(item => item != null);
                    if (validData.length > 0) {
                        this.localStorageService.setItem(`${this.genericObjectName}List`, validData);
                    }
                }),
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

    add<TRequest, TResponse extends { id: any }>(request: TRequest): Observable<TResponse> {
        return this.http.post<TResponse>(`${this.apiBaseUrl}/${this.genericObjectName}/Add`, request)
            .pipe(
                tap(response => {
                    if (!response) {
                        return;
                    }

                    const cacheKey = `${this.genericObjectName}List`;
                    let cachedData = this.localStorageService.getItem(cacheKey);

                    if (cachedData) {
                        let cachedList: TResponse[] = cachedData as TResponse[];
                        cachedList = cachedList.filter(item => item != null);
                        const index = cachedList.findIndex(item => item.id === response.id);
                        if (index >= 0) {
                            cachedList[index] = response;
                        } else {
                            cachedList.push(response);
                        }
                        this.localStorageService.setItem(cacheKey, cachedList);
                    }
                }),
                catchError(error => this.handleError<TResponse>(error))
            );
    }


    addMultiple(requests: TRequest[]): Observable<TResponse[]> {
        return this.http.post<TResponse[]>(this.apiBaseUrl + '/' + this.genericObjectName + '/AddMultiple', requests);
    }

    updateById(request: TRequest): Observable<TResponse> {
        return this.http.put<TResponse>(`${this.apiBaseUrl}/${this.genericObjectName}/UpdateById`, request)
            .pipe(
                tap(response => {
                    const cachedData = this.localStorageService.getItem(`${this.genericObjectName}List`);
                    if (cachedData) {
                        const index = cachedData.findIndex((x: any) => x.id === (response as any).id);
                        if (index >= 0) {
                            cachedData[index] = response;
                        } else {
                            cachedData.push(response);
                        }
                        this.localStorageService.setItem(`${this.genericObjectName}List`, cachedData);
                    }
                }),
                catchError(error => this.handleError<TResponse>(error))
            );
    }

    deleteById(id: number): Observable<TResponse> {
        return this.http.delete<TResponse>(`${this.apiBaseUrl}/${this.genericObjectName}/DeleteByIntId/${id}`)
            .pipe(
                tap(response => {
                    const cachedData = this.localStorageService.getItem(`${this.genericObjectName}List`);
                    if (cachedData) {
                        const index = cachedData.findIndex((x: any) => x.id === id);
                        if (index >= 0) {
                            cachedData[index].status = 'DELETED';
                            this.localStorageService.setItem(`${this.genericObjectName}List`, cachedData);
                        }
                    }
                }),
                catchError(error => this.handleError<TResponse>(error))
            );
    }

    protected handleError<T>(error: any): Observable<T> {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message, life: 3000 });
        return of(error as T);
    }
}