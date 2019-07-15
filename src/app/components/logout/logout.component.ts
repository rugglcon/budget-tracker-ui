import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-logout',
    template: `
        <div>Logging out...</div>
    `
})
export class LogoutComponent {
    constructor(authService: AuthService, router: Router) {
        authService.logout();
        router.navigate(['/login']);
    }
}
