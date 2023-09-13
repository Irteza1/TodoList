import { Component } from '@angular/core';
import { AuthService } from '../../../services/authService/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
//  this.router.navigate(['/login']);

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  user = {
    username: '',
    email: '',
    password: ''
  };

  constructor(private authService: AuthService, private router: Router, private snackBar: MatSnackBar) {}


  register() {
    this.authService.register(this.user)
      .subscribe(
        response => {
          this.snackBar.open("User Added", 'Dismiss',  {
            duration: 3000,
          });
            this.router.navigate(['/login']);
        },
        error => {
          this.snackBar.open("Failed to Add User", 'Dismiss',  {
            duration: 3000,
          });        }
      );
  }
}
