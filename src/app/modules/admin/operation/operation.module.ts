import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OperationComponent } from './operation.component';
import { Route, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FuseAlertModule } from '@fuse/components/alert';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { FuseCardModule } from '@fuse/components/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SharedModule } from 'app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';






export const routes: Route[] = [
  {
      path     : '',
      component: OperationComponent
  }
];

@NgModule({
  declarations: [
   
    
    
  
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    RouterModule.forChild(routes),
        MatButtonModule,
        MatButtonToggleModule,
        FuseAlertModule,
        MatDividerModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        FuseCardModule,
        MatTooltipModule,  SharedModule,
        FormsModule, Ng2SearchPipeModule
  ]
})
export class OperationModule { }
