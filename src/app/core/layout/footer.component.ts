import { Component } from '@angular/core';
import { version } from 'package.json';

@Component({
    selector: 'app-footer',
    template: ` <h6 class="copyright"><em>Plate Droplets Viewer v{{appVersion}}</em> &copy; 2025</h6> `,
    styles: [
        `
            :host {
                display: flex;
                align-content: middle;
                justify-content: flex-start;
                width: 100%;
            }
            .copyright {
                font-size: 0.925rem;
                font-style: italics;
                margin: 20px 30px;
                color: var(--text-muted);
            }
        `,
    ],
})
export class FooterComponent {
    appVersion = version;
}
