import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {SnackbarComponent} from "./components/snackbar/snackbar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SnackbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'contrarian-reads-frontend';
}
