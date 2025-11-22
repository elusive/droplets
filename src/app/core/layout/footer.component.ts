import { Component } from '@angular/core';

@Component({
    selector: 'app-footer',
    template: `
        <footer>
            <h6 class="copyright">Plate Droplets Viewer &copy; 2025</h6>
        </footer>
    `,
    styles: [
        `
            footer {
                background-color: #282c34;
                padding: 20px;
                color: white;
                text-align: center;
            }
            .app-title {
                margin: 0;
                font-size: 24px;
            }
        `,
    ],
})
export class Footer {}
