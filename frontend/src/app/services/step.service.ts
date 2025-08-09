import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class StepService {
  private currentStep = new BehaviorSubject<number>(1);

  getCurrentStep(): Observable<number> {
    return this.currentStep.asObservable();
  }

  setCurrentStep(step: number) {
    this.currentStep.next(step);
  }

  nextStep() {
    const next = this.currentStep.value + 1;
    this.currentStep.next(next);
  }

  previousStep() {
    const prev = this.currentStep.value - 1;
    this.currentStep.next(prev);
  }
}
