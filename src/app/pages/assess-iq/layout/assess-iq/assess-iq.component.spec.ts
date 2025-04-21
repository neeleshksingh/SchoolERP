import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessIQComponent } from './assess-iq.component';

describe('AssessIQComponent', () => {
  let component: AssessIQComponent;
  let fixture: ComponentFixture<AssessIQComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssessIQComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssessIQComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
