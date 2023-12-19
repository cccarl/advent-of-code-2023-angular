import { ComponentFixture, TestBed } from '@angular/core/testing';

import { P01Component } from './p01.component';

describe('P01Component', () => {
  let component: P01Component;
  let fixture: ComponentFixture<P01Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [P01Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(P01Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
