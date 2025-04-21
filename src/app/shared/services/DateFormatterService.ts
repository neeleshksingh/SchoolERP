import { formatDate } from "@angular/common";
import { Injectable } from "@angular/core";
@Injectable({
    providedIn: 'root'
})
export class DateFormatterService {
    constructor() { }
    ConvertLocalDateTimeString(dateTime: Date): string {
        if (dateTime instanceof Date && !isNaN(dateTime.getTime())) {
            var curr = formatDate(dateTime, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", "en-US", "India Standard Time");
            return curr.toString();
        } else {
            console.error("Invalid Date: ", dateTime);
            return "";
        }
    }
    ConvertLocalDateString(dateTime: Date) {
        var curr = formatDate(dateTime, "yyyy-MM-dd'T'00:00:00.000'Z'", "en-US", "India Standard Time");
        return curr.toString();
    }
    ConvertLocalTimeString(dateTime: Date) {
        if (dateTime) {
            var curr = formatDate(dateTime, "HH:mm:ss", "en-US", "India Standard Time");
            return curr.toString();
        }
        else {
            return null;
        }
    }

    ConvertLocalDateStringOnlyDate(dateTime: Date) {
        const day = dateTime.getDate().toString().padStart(2, '0');
        //const month = (dateTime.getMonth() + 1).toString().padStart(2, '0');
        const month = dateTime.toLocaleString([], { month: 'short' });
        const year = dateTime.getFullYear();

        return day + '-' + month + '-' + year;
    }

    ConvertToIST(dateTime: Date): Date {
        if (dateTime instanceof Date && !isNaN(dateTime.getTime())) {
            const istDate = new Date(dateTime);
            istDate.setMinutes(istDate.getMinutes() + 330);
            return istDate;
        } else {
            console.error("Invalid Date: ", dateTime);
            return new Date();
        }
    }
}