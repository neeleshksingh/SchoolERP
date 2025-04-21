import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpsCoreComponent } from './ops-core.component';

describe('OpsCoreComponent', () => {
  let component: OpsCoreComponent;
  let fixture: ComponentFixture<OpsCoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OpsCoreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpsCoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
