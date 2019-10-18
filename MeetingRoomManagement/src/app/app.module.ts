import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ListEventsComponent } from './list-events/list-events.component';
import { AppMaterialModule } from './app-material.module';
import { BookFormComponent } from './book-form/book-form.component';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { NotifyUserComponent } from './notify-user/notify-user.component';

@NgModule({
  declarations: [
    AppComponent,
    ListEventsComponent,
    BookFormComponent,
    NotifyUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppMaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [BookFormComponent, NotifyUserComponent]
})
export class AppModule { }
