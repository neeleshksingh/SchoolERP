import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeoplePulseComponent } from './people-pulse.component';

describe('PeoplePulseComponent', () => {
  let component: PeoplePulseComponent;
  let fixture: ComponentFixture<PeoplePulseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PeoplePulseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PeoplePulseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
