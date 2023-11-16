import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGuiHomeComponent } from '../admin-gui-home/admin-gui-home.component';

describe('AdminGuiHomeComponent', () => {
  let component: AdminGuiHomeComponent;
  let fixture: ComponentFixture<AdminGuiHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminGuiHomeComponent]
    });
    fixture = TestBed.createComponent(AdminGuiHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    // @ts-ignore
    expect(component).toBeTruthy();
  });
});
