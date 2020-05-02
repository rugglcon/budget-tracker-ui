import { TestBed, inject } from '@angular/core/testing';

import { AuthService } from '../src/app/services/auth.service';
import { AuthResource } from 'src/app/resources/auth.resource';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        AuthResource,
        HttpClient,
        HttpHandler
      ]
    });
  });

  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));
});
