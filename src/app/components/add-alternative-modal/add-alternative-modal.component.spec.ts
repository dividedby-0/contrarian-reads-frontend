import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAlternativeModalComponent } from './add-alternative-modal.component';

describe('AddAlternativeModalComponent', () => {
  let component: AddAlternativeModalComponent;
  let fixture: ComponentFixture<AddAlternativeModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddAlternativeModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddAlternativeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
