import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProblemContainerComponent } from './problem-container.component';

describe('ProblemContainerComponent', () => {
  let component: ProblemContainerComponent;
  let fixture: ComponentFixture<ProblemContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProblemContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProblemContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
