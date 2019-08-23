import { Injectable } from '@angular/core';
import { AuthResource } from '../resources/auth.resource';
import { Credentials } from '../models/credentials.model';
import { Router } from '@angular/router';
import { NewUser, LoginSuccess } from '../models/login-success.model';
import { DataCache } from '../models/data-cache.model';

@Injectable()
/**
 * this service helps with authentication
 */
export class AuthService {
  private loggedIn = false;
  private registeredDataCache: DataCache[] = [];

  token!: string;

  public redirectUrl?: string;

  constructor(private authResource: AuthResource) { }

  public isAuthenticated(): boolean {
    const user = this.getTokenDetails();
    if (user) {
      return user.exp > Date.now() / 1000;
    }

    return false;
  }

  async login(credentials: Credentials): Promise<boolean> {
    try {
      const data = await this.authResource.login(credentials);
      this.setToken(data);
      return true;
    } catch (err) {
      this.loggedIn = false;
      return false;
    }
  }

  getTokenDetails(): UserDetails | null {
    const token = this.getToken();
    if (token) {
      let payload = token.split('.')[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    }

    return null;
  }

  registerDataCache(dataCache: DataCache): void {
    this.registeredDataCache.push(dataCache);
  }

  async logout(): Promise<boolean> {
    await this.authResource.logout();
    this.cleanupData();
    delete this.redirectUrl;
    this.loggedIn = false;
    this.removeToken();
    delete this.token;
    return true;
  }

  removeToken(): void {
    localStorage.removeItem('token');
  }

  getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('token') as string;
    }
    return this.token;
  }

  setToken(data: TokenResponse): void {
    localStorage.setItem('token', data.token);
    this.token = data.token;
    this.loggedIn = true;
  }

  async signup(creds: NewUser): Promise<boolean> {
    try {
      const newUser = await this.authResource.signup(creds);
      this.setToken(newUser);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  cleanupData(): void {
    this.registeredDataCache.forEach(cache => cache.clearData());
  }
}

export interface UserDetails {
  id: number;
  email: string;
  userName: string;
  exp: number;
  iat: number;
}

export interface TokenResponse {
  token: string;
}
