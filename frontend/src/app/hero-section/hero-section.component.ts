import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, BoltIcon, ShieldIcon, CheckCircleIcon } from 'lucide-angular';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.scss'
})
export class HeroSectionComponent {
  readonly BoltIcon = BoltIcon;
  readonly ShieldIcon = ShieldIcon;
  readonly CheckCircleIcon = CheckCircleIcon;
}
