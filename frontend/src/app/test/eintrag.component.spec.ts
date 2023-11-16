import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EintragComponent } from '../eintrag/eintrag.component';

describe('EintragComponent', () => {
  let component: EintragComponent;
  let fixture: ComponentFixture<EintragComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EintragComponent]
    });
    fixture = TestBed.createComponent(EintragComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    // @ts-ignore
    expect(component).toBeTruthy();
  });
});
