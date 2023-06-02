import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { FuseHighlightModule } from '@fuse/components/highlight';
import { SharedModule } from 'app/shared/shared.module';
import { SavComponent } from 'app/modules/admin/sav/sav.component';
import { MatFormFieldModule } from '@angular/material/form-field';

export const routes: Route[] = [
    {
        path     : '',
        component: SavComponent
    }
];

@NgModule({
    declarations: [
        SavComponent
    ],
    imports     : [
        RouterModule.forChild(routes),
        MatIconModule,
        MatRippleModule,
        MatTabsModule,
        FuseHighlightModule,
        SharedModule,
        MatFormFieldModule
        
    ]
    
})
export class SavModule
{
}
