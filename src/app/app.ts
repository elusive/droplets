import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './core/layout/header.component';
import { Footer } from './core/layout/footer.component';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, Footer, Header],
    template: ` <div class="wrapper">
        <app-header></app-header>
        <router-outlet />
        <app-footer></app-footer>
    </div>`,
    styles: [
        `
            .wrapper {
                display: grid;
                grid-template-rows: auto 1fr auto; /* Header, main content, footer */
                min-height: 100vh;
            }
        `,
    ],
})
export class App {
    //protected readonly title = signal('droplets');
}
