import { ComponentFixture, TestBed } from '@angular/core/testing';

import { P05Component } from './p05.component';

describe('P05Component', () => {
  let component: P05Component;
  let fixture: ComponentFixture<P05Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [P05Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(P05Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
