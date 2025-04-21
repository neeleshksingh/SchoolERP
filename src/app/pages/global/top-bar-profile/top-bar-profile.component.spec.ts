import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopBarProfileComponent } from './top-bar-profile.component';

describe('TopBarProfileComponent', () => {
  let component: TopBarProfileComponent;
  let fixture: ComponentFixture<TopBarProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopBarProfileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopBarProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
