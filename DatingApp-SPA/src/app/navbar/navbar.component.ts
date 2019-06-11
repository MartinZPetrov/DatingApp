import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  model: any = {};
  photoUrl: string;

  constructor(public authService: AuthService, private aleritify: AlertifyService, private router: Router) { }

  ngOnInit() {
    this.authService.currentPhotoUrl.subscribe(photoURL => this.photoUrl = photoURL);
  }

  login() {
    this.authService.login(this.model).subscribe(next => {
      this.aleritify.success('Logged in successfully');
    }, error => {
      this.aleritify.error(error);
    });
  }
  loggedIn() {
    return this.authService.loggedIn();
  }

  logout() {
    localStorage.removeItem('user')
    localStorage.removeItem('token');
    this.authService.decodedToken = null;
    this.authService.currentUser = null;
    this.aleritify.message('logged out');
  }
}
