import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { GridModule } from '@progress/kendo-angular-grid';

import { AppComponent } from './app.component';
import { EditService } from './edit.service';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        HttpClientModule,
        HttpClientJsonpModule,
        BrowserModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        GridModule
    ],
    providers: [
        {
            deps: [HttpClient],
            provide: EditService,
            useFactory: (jsonp: HttpClient) => () => new EditService(jsonp)
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}

