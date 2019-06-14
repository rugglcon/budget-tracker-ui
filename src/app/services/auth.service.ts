import { Injectable } from '@angular/core';
import { AuthResource } from '../resources/auth.resource';
import { Credentials } from '../models/credentials.model';
import { Router } from '@angular/router';
import { NewUser, LoginSuccess } from '../models/login-success.model';

@Injectable()
/**
 * this service helps with authentication
 */
export class AuthService {
  private loggedIn = false;

  token: any;

  public redirectUrl: string = null;

  constructor(private authResource: AuthResource) { }

  public isAuthenticated(): boolean {
    return this.loggedIn;
  }

  async login(credentials: Credentials): Promise<boolean> {
    try {
      const data = await this.authResource.login(credentials);
      console.log(data);
      this.setData(data);
      return true;
    } catch (err) {
      this.loggedIn = true;
      console.log(err);
      return false;
    }
  }

  logout(): boolean {
    this.loggedIn = false;
    this.redirectUrl = null;
    return true;
  }

  setData(data: LoginSuccess): void {
    localStorage.setItem('token', data.token);
    localStorage.setItem('username', data.userName);
    localStorage.setItem('id', data.id.toString());
    localStorage.setItem('email', data.email);
    this.loggedIn = true;
  }

  async signup(creds: NewUser): Promise<boolean> {
    try {
      const newUser = await this.authResource.signup(creds);
      console.log(newUser);
      this.setData(newUser);
      return true;
    } catch (err) {
      return false;
    }
  }
}
