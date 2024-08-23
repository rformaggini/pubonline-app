import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BriefOrderComponent } from './brief-order.component';

describe('BriefOrderComponent', () => {
  let component: BriefOrderComponent;
  let fixture: ComponentFixture<BriefOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BriefOrderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BriefOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
