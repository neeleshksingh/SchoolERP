import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoreXComponent } from './core-x.component';

describe('CoreXComponent', () => {
  let component: CoreXComponent;
  let fixture: ComponentFixture<CoreXComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoreXComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoreXComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
