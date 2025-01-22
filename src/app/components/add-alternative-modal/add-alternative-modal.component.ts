import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-add-alternative-modal',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './add-alternative-modal.component.html',
  styleUrl: './add-alternative-modal.component.css'
})
export class AddAlternativeModalComponent {
  mainBook: string = '';
  suggestedAlternative: string = '';
  reason: string = '';

  constructor(
    public dialogRef: MatDialogRef<AddAlternativeModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onConfirm(): void {
    console.log('Main Book:', this.mainBook);
    console.log('Suggested Alternative:', this.suggestedAlternative);
    console.log('Reason:', this.reason);
    this.dialogRef.close();
  }
}
