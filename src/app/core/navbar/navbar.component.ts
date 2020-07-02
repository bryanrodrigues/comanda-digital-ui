import { ErrorHandlerService } from './../error-handler.service';
import { Component, OnInit, ErrorHandler } from '@angular/core';
import { AuthService } from 'src/app/security/auth.service';
import { Router } from '@angular/router';
;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
  public  auth: AuthService,
  private errorHandler: ErrorHandlerService,
  private router: Router
  ) { }

  ngOnInit(): void {
  }

  showMenu = false;

  loggout(){
    this.auth.loggout()
      .then(() => {
        this.router.navigate(['/login']);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }




}
