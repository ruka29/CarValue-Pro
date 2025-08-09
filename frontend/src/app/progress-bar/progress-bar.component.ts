import { Component, OnInit, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, CarIcon, SettingsIcon, PaletteIcon, CalendarIcon, CheckCircleIcon, CheckCircle2Icon } from 'lucide-angular';
import { StepService } from '../services/step.service';

@Component({
  selector: 'app-progress-bar',
  imports: [LucideAngularModule, CommonModule],
  templateUrl: './progress-bar.component.html',
  styleUrl: './progress-bar.component.scss'
})
export class ProgressBarComponent implements OnInit {
  readonly CarIcon = CarIcon;
  readonly SettingsIcon = SettingsIcon;
  readonly PaletteIcon = PaletteIcon;
  readonly CalendarIcon = CalendarIcon;
  readonly CheckCircleIcon = CheckCircleIcon;
  readonly CheckCircle2Icon = CheckCircle2Icon;

  public currentStep: number = 1;
  public stepTitles: string[] = ['Vehicle Information', 'Engine Information', 'Vehicle Appearance', 'Usage Information', 'Review & Predict'];

  constructor(private stepService: StepService) {}

  ngOnInit() {
    this.stepService.getCurrentStep().subscribe((step: number) => {
      this.currentStep = step;
      this.updateProgressBar();
    });
  }

  updateProgressBar() {
    const progressPercentage = this.currentStep / 5 * 100;

    const progressBar = document.getElementById('progress-bar');
    if (progressBar) {
      progressBar.style.width = `${progressPercentage}%`;
    }
  }
}
