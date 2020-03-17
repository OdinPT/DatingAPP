import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/_services/auth.service';

@Component({
  selector: 'app-app-nav',
  templateUrl: './app-nav.component.html',
  styleUrls: ['./app-nav.component.css']
})
export class AppNavComponent implements OnInit {
  model: any  = {};

  constructor(private authService: AuthService) { }

  ngOnInit() {
  } 

  login() {
    this.authService.login(this.model).subscribe(next => {
      console.log('Logged in sucessfully');
    }, error => {
      console.log('Failed to login');
    });

  }

  loggedIn(){
    const token = localStorage.getItem('token');
    return !!token;
  }

  logout(){
    localStorage.removeItem('token');
    console.log('logged out ');
  }
}
