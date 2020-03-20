import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/_services/auth.service';
import { AlertifyService } from 'src/_services/alertify.service';

@Component({
  selector: 'app-app-nav',
  templateUrl: './app-nav.component.html',
  styleUrls: ['./app-nav.component.css']
})
export class AppNavComponent implements OnInit {
  model: any  = {};

  constructor(public authService: AuthService, private alertify: AlertifyService) { }

  ngOnInit() {
  } 

  login() {
    this.authService.login(this.model).subscribe(next => {
     this.alertify.success('Logged in sucessfully');
    }, error => {
      this.alertify.error(error);
    });
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

  logout() {
    localStorage.removeItem('token');
    this.alertify.message('logged out ');
  }
}
