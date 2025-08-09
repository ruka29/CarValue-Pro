import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Brain, Clock, Shield } from 'lucide-angular';

@Component({
  selector: 'app-features-section',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './features-section.component.html',
  styleUrl: './features-section.component.scss',
})
export class FeaturesSectionComponent {
  readonly Brain = Brain;
  readonly Clock = Clock;
  readonly Shield = Shield;

  features = [
    {
      icon: this.Brain,
      title: 'AI-Powered Accuracy',
      description:
        'Our machine learning algorithms analyze millions of data points to provide the most accurate price predictions.',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: this.Clock,
      title: 'Instant Results',
      description:
        "Get your vehicle's market value in seconds with our lightning-fast prediction engine.",
      gradient: 'from-violet-500 to-purple-500',
    },
    {
      icon: this.Shield,
      title: 'Secure & Private',
      description:
        'Your data is encrypted and never shared. We prioritize your privacy and security above all.',
      gradient: 'from-emerald-500 to-teal-500',
    },
  ];
}
