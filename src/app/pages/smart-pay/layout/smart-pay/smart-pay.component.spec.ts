import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartPayComponent } from './smart-pay.component';

describe('SmartPayComponent', () => {
  let component: SmartPayComponent;
  let fixture: ComponentFixture<SmartPayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SmartPayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmartPayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
