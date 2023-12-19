import { ComponentFixture, TestBed } from '@angular/core/testing';

import { P02Component } from './p02.component';

describe('P02Component', () => {
  let component: P02Component;
  let fixture: ComponentFixture<P02Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [P02Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(P02Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
