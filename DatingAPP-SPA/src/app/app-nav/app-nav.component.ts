import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/_services/auth.service';
import { AlertifyService } from 'src/_services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-app-nav',
  templateUrl: './app-nav.component.html',
  styleUrls: ['./app-nav.component.css']
})
export class AppNavComponent implements OnInit {
  model: any  = {};

  constructor(public authService: AuthService, private alertify: AlertifyService,
     private router: Router) { }
  ngOnInit() {
  }

  login() {
    this.authService.login(this.model).subscribe(next => {
     this.alertify.success('Logged in sucessfully');
    }, error => {
      this.alertify.error(error);
    }, () =>{
      this.router.navigate(['/members']);
    } );
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.authService.decodedToken = null;
    this.authService.currentUSer = null;
    this.alertify.message('logged out ');
    this.router.navigate(['/home']);
  }
}
