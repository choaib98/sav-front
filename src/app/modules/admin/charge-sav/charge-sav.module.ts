import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';

import { MatTooltipModule } from '@angular/material/tooltip';

import { SharedModule } from 'app/shared/shared.module';

import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ChargeSavComponent } from './charge-sav.component';
import { FuseCardModule } from '@fuse/components/card';
import { MatBadgeModule } from '@angular/material/badge';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatSelectModule} from "@angular/material/select";
import {MatExpansionModule} from "@angular/material/expansion";


export const routes: Route[] = [
    {
        path     : '',
        component: ChargeSavComponent
    }
];

@NgModule({
    declarations: [
        ChargeSavComponent,
    ],
    imports: [
        RouterModule.forChild(routes),
        MatButtonModule,
        MatButtonToggleModule,

        MatDividerModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        FuseCardModule,
        MatTooltipModule,
        MatBadgeModule,
        SharedModule,
        FormsModule, Ng2SearchPipeModule, MatSidenavModule, MatCheckboxModule, MatSelectModule, MatExpansionModule
    ]
})
export class ChargeSavModule
{
}
