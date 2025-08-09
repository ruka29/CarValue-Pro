import { Component } from '@angular/core';
import { ProgressBarComponent } from '../progress-bar/progress-bar.component';
import { MainFormContainerComponent } from '../main-form-container/main-form-container.component';
import { ErrorMessageContainerComponent } from '../error-message-container/error-message-container.component';
import { FeaturesSectionComponent } from '../features-section/features-section.component';

@Component({
  selector: 'app-prediction-app-container',
  imports: [
    ProgressBarComponent,
    MainFormContainerComponent,
    ErrorMessageContainerComponent,
    FeaturesSectionComponent
  ],
  templateUrl: './prediction-app-container.component.html',
  styleUrl: './prediction-app-container.component.scss',
})
export class PredictionAppContainerComponent {}
