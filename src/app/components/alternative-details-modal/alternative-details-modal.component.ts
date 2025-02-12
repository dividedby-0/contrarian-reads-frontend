import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {SuggestionRetrieve} from '../../models/suggestion-retrieve';
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-suggested-book-modal',
  standalone: true,
  imports: [
    NgIf,
    NgForOf],
  templateUrl: './alternative-details-modal.component.html',
  styleUrl: './alternative-details-modal.component.css'
})
export class AlternativeDetailsModalComponent {
  suggestionData: SuggestionRetrieve;

  constructor(
    public dialogRef: MatDialogRef<AlternativeDetailsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.suggestionData = data.suggestion;
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
