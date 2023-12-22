import { ComponentFixture, TestBed } from '@angular/core/testing';

import { P03Component } from './p03.component';

describe('P03Component', () => {
  let component: P03Component;
  let fixture: ComponentFixture<P03Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [P03Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(P03Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
