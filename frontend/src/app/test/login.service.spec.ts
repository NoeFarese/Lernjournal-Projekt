import { TestBed } from '@angular/core/testing';

import { LoginService } from '../Services/login.service';

describe('LoginService', () => {
  let service: LoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginService);
  });

  it('should be created', () => {
    // @ts-ignore
    expect(service).toBeTruthy();
  });
});
