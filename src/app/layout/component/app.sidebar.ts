import { Component, ElementRef } from '@angular/core';
import { AppMenu } from './app.menu';

@Component({
    selector: 'app-sidebar',
    standalone: true,
    imports: [AppMenu],
    template: ` <div class="layout-sidebar card">
        <app-menu></app-menu>
    </div>`,
    styles: [`
            .layout-sidebar::-webkit-scrollbar{
                display: none;
            }
            `]
})
export class AppSidebar {
    constructor(public el: ElementRef) { }
}
