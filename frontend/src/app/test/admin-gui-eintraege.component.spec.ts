import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGuiEintraegeComponent } from '../admin-gui-eintraege/admin-gui-eintraege.component';

describe('AdminGuiEintraegeComponent', () => {
  let component: AdminGuiEintraegeComponent;
  let fixture: ComponentFixture<AdminGuiEintraegeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminGuiEintraegeComponent]
    });
    fixture = TestBed.createComponent(AdminGuiEintraegeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    // @ts-ignore
    expect(component).toBeTruthy();
  });
});
