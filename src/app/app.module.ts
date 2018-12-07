import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './entities/main/main.component';
import { AboutUsComponent } from './entities/about-us/about-us.component';
import { FooterComponent } from './entities/footer/footer.component';
import {AppRoutingService} from "./common/services/routing.service";
import { HomeComponent } from './entities/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    AboutUsComponent,
    FooterComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [AppRoutingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
