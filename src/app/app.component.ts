import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {SnackbarComponent} from "./components/snackbar/snackbar.component";
import {MatDialogModule} from "@angular/material/dialog";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SnackbarComponent, MatDialogModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'contrarian-reads-frontend';
}
