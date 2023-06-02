import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestRoutingModule } from './test-routing.module';
import { TestComponent } from './test.component';
import { Route, RouterModule } from '@angular/router';

export const routes: Route[] = [
  {
      path     : '',
      component: TestComponent
  }
];

@NgModule({
  declarations: [
    TestComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    TestRoutingModule
  ]
})
export class TestModule { }
