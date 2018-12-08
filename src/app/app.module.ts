import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgDragDropModule } from 'ng-drag-drop';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './container/home/home.component';
import { TestComponent } from './container/test/test.component';
import { TodoService } from './services/todo.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TestComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgDragDropModule.forRoot()
  ],
  providers: [TodoService],
  bootstrap: [AppComponent]
})

export class AppModule { }

