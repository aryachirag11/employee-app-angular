import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
// import { UserService } from './service/user.service';
import { AppRoutingModule } from './app-routing';
import { LoginFormComponent } from './components/login-form/login-form.component';

@NgModule({
  imports: [BrowserModule, FormsModule, AppRoutingModule],
  declarations: [AppComponent, LoginFormComponent],
  bootstrap: [AppComponent],
  // providers: [UserService],
})
export class AppModule {}
