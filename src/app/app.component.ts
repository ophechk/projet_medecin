import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Medecin } from './types/medecin';
import { DoctorsService } from './services/doctors.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  private readonly doctorsService = inject(DoctorsService);
  private readonly destroyRef = inject(DestroyRef);
  medecins!: Medecin[];

  ngOnInit(): void {
    this.doctorsService.getDoctors()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((medecins) => {
      this.medecins = medecins;
    });
  }
}
