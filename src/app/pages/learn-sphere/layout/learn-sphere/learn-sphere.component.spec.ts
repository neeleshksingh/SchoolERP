import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnSphereComponent } from './learn-sphere.component';

describe('LearnSphereComponent', () => {
  let component: LearnSphereComponent;
  let fixture: ComponentFixture<LearnSphereComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LearnSphereComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LearnSphereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
