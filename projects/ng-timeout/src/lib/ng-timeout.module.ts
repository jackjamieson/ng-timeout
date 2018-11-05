import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { NgTimeoutService } from './ng-timeout.service';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule
  ]
})
export class NgTimeoutModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: NgTimeoutModule,
      providers: [NgTimeoutService]
    };
  }
}
