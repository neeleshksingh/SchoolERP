import { Injectable } from '@angular/core';

export interface SelectItem {
    label: string;
    value: any;
}

@Injectable({
    providedIn: 'root',
})
export class UtilityService {
    reduceDuplicates(list: SelectItem[]): SelectItem[] {
        return list.reduce((acc, current) => {
            if (!acc.some((item) => item.label === current.label && item.value === current.value)) {
                acc.push(current);
            }
            return acc;
        }, [] as SelectItem[]);
    }
}