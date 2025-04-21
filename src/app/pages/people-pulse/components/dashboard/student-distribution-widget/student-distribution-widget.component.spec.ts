import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentDistributionWidgetComponent } from './student-distribution-widget.component';

describe('StudentDistributionWidgetComponent', () => {
  let component: StudentDistributionWidgetComponent;
  let fixture: ComponentFixture<StudentDistributionWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentDistributionWidgetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentDistributionWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
