import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/authService/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router, private snackBar: MatSnackBar) { }
  email: any = ''
  password: any = ''
  login() {
    const user = {
      email: this.email,
      password: this.password
    };

    this.authService.login(user).subscribe(
      (response) => {
        this.snackBar.open("Login Successfully", 'Dismiss', {
          duration: 3000,
        });
        localStorage.setItem('token', response.token);
        localStorage.setItem('userId', response.userId);

        this.router.navigate(['/tasks']);
      },
      (error) => {
        this.snackBar.open("Error while Login ", 'Dismiss', {
          duration: 3000,
        });
      }
    );
  }
}
