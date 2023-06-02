import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { maintenanceRoutes } from './maintenance.routing';
import { MaintenanceComponent } from './maintenance.component';

@NgModule({
    declarations: [
        MaintenanceComponent
    ],
    imports     : [
        RouterModule.forChild(maintenanceRoutes)
    ]
})
export class MaintenanceModule
{
}
