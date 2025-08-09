import { NgModule } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { Bolt, Shield, CheckCircle } from 'lucide';

const icons = {
  Bolt,
  Shield,
  CheckCircle,
};

@NgModule({
  imports: [LucideAngularModule.pick(icons)],
  exports: [LucideAngularModule],
})
export class IconsModule {}