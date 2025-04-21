import { Component, ElementRef, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Menubar } from 'primeng/menubar';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { Ripple } from 'primeng/ripple';

@Component({
    selector: 'app-navigationbar',
    standalone: true,
    imports: [Menubar, BadgeModule, AvatarModule, InputTextModule, Ripple, CommonModule],
    template: ` <p-menubar [model]="items" styleClass="card">
    <ng-template #start>
        <svg width="33" height="35" viewBox="0 0 33 35" fill="none" xmlns="http://www.w3.org/2000/svg">
            <!-- <path d="..." fill="var(--primary-color)" /> -->
        </svg>
    </ng-template>
    <ng-template #item let-item let-root="root">
        <a pRipple class="flex items-center p-menubar-item-link">
            <span>{{ item.label }}</span>
            <p-badge *ngIf="item.badge" [ngClass]="{ 'ml-auto': !root, 'ml-2': root }" [value]="item.badge" />
            <span *ngIf="item.shortcut" class="ml-auto border border-surface rounded bg-emphasis text-muted-color text-xs p-1">{{ item.shortcut }}</span>
            <i *ngIf="item.items" [ngClass]="['ml-auto pi', root ? 'pi-angle-down' : 'pi-angle-right']"></i>
        </a>
    </ng-template>
    <ng-template #end>
        <div class="flex items-center gap-2">
            <input type="text" pInputText placeholder="Search" class="w-36" />
            <p-avatar image="https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png" shape="circle" />
        </div>
    </ng-template>
</p-menubar>`,
    styles: [`
        :host ::ng-deep .p-menubar-submenu  {
            z-index: 1000;       
        }
        :host ::ng-deep .p-menubar  {
            margin-bottom: 1rem !important;     
        }
            `]
})
export class AppNavigationbar {
    items: MenuItem[] | undefined;
    constructor(public el: ElementRef) { }

    ngOnInit() {
        this.items = [
            {
                label: 'Home',
                icon: 'pi pi-home',
            },
            {
                label: 'Projects',
                icon: 'pi pi-search',
                badge: '3',
                items: [
                    {
                        label: 'Core',
                        icon: 'pi pi-bolt',
                        shortcut: '⌘+S',
                    },
                    {
                        label: 'Blocks',
                        icon: 'pi pi-server',
                        shortcut: '⌘+B',
                    },
                    {
                        separator: true,
                    },
                    {
                        label: 'UI Kit',
                        icon: 'pi pi-pencil',
                        shortcut: '⌘+U',
                    },
                ],
            },
        ];
    }
}
