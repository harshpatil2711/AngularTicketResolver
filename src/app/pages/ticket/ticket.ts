import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-ticket',
  standalone: true,
  imports: [RouterOutlet],
templateUrl: './ticket.html',
  styleUrl: './ticket.css'
})
export class Ticket {}
