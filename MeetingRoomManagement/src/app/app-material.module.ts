import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatCardModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatButtonModule
  ],
  exports: [
    MatCardModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatButtonModule
  ]
})
export class AppMaterialModule { }
