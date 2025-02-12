import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlternativeDetailsModalComponent } from './alternative-details-modal.component';

describe('AlternativeDetailsModalComponent', () => {
  let component: AlternativeDetailsModalComponent;
  let fixture: ComponentFixture<AlternativeDetailsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlternativeDetailsModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlternativeDetailsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
