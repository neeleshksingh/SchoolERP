import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrollXComponent } from './enroll-x.component';

describe('EnrollXComponent', () => {
  let component: EnrollXComponent;
  let fixture: ComponentFixture<EnrollXComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnrollXComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnrollXComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
