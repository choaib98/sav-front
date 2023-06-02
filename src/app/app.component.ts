import { Component } from '@angular/core';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";


@Component({
    selector   : 'app-root',
    templateUrl: './app.component.html',
    styleUrls  : ['./app.component.scss']
})
export class AppComponent
{
    /**
     * Constructor
     */
    constructor(
        private matIconRegistry: MatIconRegistry,
        private domSanitizer: DomSanitizer,
    )
    {
        this.matIconRegistry.addSvgIcon(
            "timeline",
            this.domSanitizer.bypassSecurityTrustResourceUrl("assets/iconswi/TIMELINE.svg")
        );
    }
}
