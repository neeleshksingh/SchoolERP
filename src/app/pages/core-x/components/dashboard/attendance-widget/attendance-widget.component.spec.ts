import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceWidgetComponent } from './attendance-widget.component';

describe('AttendanceWidgetComponent', () => {
  let component: AttendanceWidgetComponent;
  let fixture: ComponentFixture<AttendanceWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttendanceWidgetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttendanceWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
