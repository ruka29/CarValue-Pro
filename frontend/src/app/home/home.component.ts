import { Component } from '@angular/core';
import { NavigationBarComponent } from '../navigation-bar/navigation-bar.component';
import { FooterComponent } from '../footer/footer.component';
import { HeroSectionComponent } from '../hero-section/hero-section.component';
import { BackgroundComponent } from '../background/background.component';
import { PredictionAppContainerComponent } from '../prediction-app-container/prediction-app-container.component';

@Component({
  selector: 'app-home',
  imports: [
    BackgroundComponent,
    NavigationBarComponent,
    HeroSectionComponent,
    PredictionAppContainerComponent,
    FooterComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
