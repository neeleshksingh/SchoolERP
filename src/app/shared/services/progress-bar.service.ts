import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ProgressBarService {
    private count = 0;
    private progressBar$ = new BehaviorSubject<string>('stop');

    constructor() { }

    getProgressBarObserver(): Observable<string> {
        return this.progressBar$.asObservable();
    }

    requestStarted() {
        this.count++;
        if (this.count === 1) {
            this.progressBar$.next('start');
        }
    }

    requestEnded() {
        if (this.count === 0 || --this.count === 0) {
            this.progressBar$.next('stop');
        }
    }

    resetProgressBar() {
        this.count = 0;
        this.progressBar$.next('stop');
    }
}