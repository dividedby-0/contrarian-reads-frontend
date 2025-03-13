import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowSuggestionsForBookModalComponent } from './show-suggestions-for-book-modal.component';

describe('ShowSuggestionsForBookModalComponent', () => {
  let component: ShowSuggestionsForBookModalComponent;
  let fixture: ComponentFixture<ShowSuggestionsForBookModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowSuggestionsForBookModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowSuggestionsForBookModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
