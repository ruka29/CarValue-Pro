import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorMsgService } from '../services/error-msg.service';
import { StepService } from '../services/step.service';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  LucideAngularModule,
  Info,
  Settings,
  Palette,
  CalendarDays,
  CheckCircle2,
  Trophy,
  ArrowLeft,
  ArrowRight,
  Calculator,
  Car,
  RotateCcw
} from 'lucide-angular';

@Component({
  selector: 'app-main-form-container',
  imports: [CommonModule, LucideAngularModule, ReactiveFormsModule],
  templateUrl: './main-form-container.component.html',
  styleUrl: './main-form-container.component.scss',
})
export class MainFormContainerComponent {
  public currentStep: number = 1;
  public currentStepTitle: string = '';

  // private vehicleModels: string[] = [
  //   'Toyota Camry',
  //   'Mercedes-Benz C class',
  //   'Hyundai Elantra',
  //   'Nissan Rogue',
  //   'Kia Forte',
  // ];
  // private vehicleTypes: string[] = [];
  // private mortorCapacities: string[] = [];
  // private fuelTypes: string[] = [];
  // private colors: string[] = [];
  // private wheelOrientations: string[] = [];
  // private vehicleConditions: string[] = [];

  public vehicles: {
    model: string;
    types: string[];
    motorCapacity: string[];
    motorTypes: string[];
  }[] = [
    {
      model: 'Toyota Camry',
      types: ['Sedan', 'SUV', 'Hatchback', 'Minivan / Minibus'],
      motorCapacity: ['1.2', '1.4', '1.6', '1.8', '2.0'],
      motorTypes: ['Petrol', 'Gas', 'Petrol and Gas'],
    },
    {
      model: 'Mercedes-Benz C class',
      types: ['Sedan', 'SUV', 'Hatchback', 'Coupe', 'Pickup', 'Universal'],
      motorCapacity: [
        '0.2',
        '0.3',
        '1.5',
        '1.8',
        '2.1',
        '2.2',
        '2.3',
        '2.4',
        '2.5',
        '2.6',
        '2.8',
        '2.8',
        '3.2',
        '3.5',
        '4.0',
        '5.0',
      ],
      motorTypes: ['Petrol', 'Gas', 'Petrol and Gas', 'Diesel'],
    },
    {
      model: 'Hyundai Elantra',
      types: ['Sedan', 'Hatchback', 'Coupe'],
      motorCapacity: ['1.6', '1.8', '2.0', '2.4', '2.5'],
      motorTypes: ['Petrol', 'Gas', 'Petrol and Gas', 'Hybrid'],
    },
    {
      model: 'Nissan Rogue',
      types: ['Sedan', 'SUV', 'Hatchback', 'Universal'],
      motorCapacity: ['1.3', '1.5', '2.0', '2.4', '2.5'],
      motorTypes: ['Petrol', 'Gas', 'Petrol and Gas'],
    },
    {
      model: 'Kia Forte',
      types: ['Sedan', 'Hatchback', 'Coupe', 'Universal'],
      motorCapacity: ['0.2', '1.6', '1.8', '2.0', '2.4'],
      motorTypes: ['Petrol'],
    },
  ];

  public selectedVehicle: string = '';
  public predictedPrice: number | null = null;

  readonly Info = Info;
  readonly Settings = Settings;
  readonly Palette = Palette;
  readonly CalendarDays = CalendarDays;
  readonly CheckCircle2 = CheckCircle2;
  readonly Trophy = Trophy;
  readonly ArrowLeft = ArrowLeft;
  readonly ArrowRight = ArrowRight;
  readonly Calculator = Calculator;
  readonly Car = Car;
  readonly RotateCcw = RotateCcw;

  constructor(
    private errorMsgService: ErrorMsgService,
    private stepService: StepService,
    private http: HttpClient
  ) {}

  vehicleDataForm = new FormGroup({
    vehicleModel: new FormControl('', [Validators.required]),
    vehicleType: new FormControl('', [Validators.required]),
    motorCapacity: new FormControl('', [Validators.required]),
    fuelType: new FormControl('', [Validators.required]),
    color: new FormControl('', [Validators.required]),
    wheelOrientation: new FormControl('', [Validators.required]),
    vehicleCondition: new FormControl('', [Validators.required]),
    manufactureYear: new FormControl('', [
      Validators.required,
      Validators.pattern('^(19|20)\\d{2}$'),
    ]),
    milage: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]+(\\.[0-9]{1,2})?$'),
    ]),
  });

  onPrevBtnClick() {
    this.updateStepContentOnPrev();
    this.currentStep--;
    this.stepService.previousStep();
  }

  onNextBtnClick() {
    const validStep = this.isStepValid(this.currentStep);
    if (validStep) {
      this.updateStepContentOnNext();
      this.currentStep++;
      this.stepService.nextStep();
    } else {
      this.errorMsgService.setError(
        'Please fill in all required fields for ' + this.currentStepTitle + '!'
      );
    }
  }

  isStepValid(step: number): boolean {
    switch (step) {
      case 1:
        this.currentStepTitle = 'Vehicle Information';
        return (
          this.vehicleDataForm.get('vehicleModel')?.valid === true &&
          this.vehicleDataForm.get('vehicleType')?.valid === true
        );

      case 2:
        this.currentStepTitle = 'Engine and Fuel Information';
        return (
          this.vehicleDataForm.get('motorCapacity')?.valid === true &&
          this.vehicleDataForm.get('fuelType')?.valid === true
        );

      case 3:
        this.currentStepTitle = 'Vehicle Appearance and Condition';
        return (
          this.vehicleDataForm.get('color')?.valid === true &&
          this.vehicleDataForm.get('wheelOrientation')?.valid === true &&
          this.vehicleDataForm.get('vehicleCondition')?.valid === true
        );

      case 4:
        this.currentStepTitle = 'Manufacture Year and Mileage';
        return (
          this.vehicleDataForm.get('manufactureYear')?.valid === true &&
          this.vehicleDataForm.get('milage')?.valid === true
        );

      default:
        return false;
    }
  }

  updateStepContentOnNext() {
    const currentStepContentElement = document.getElementById(
      `step-${this.currentStep}`
    );
    if (currentStepContentElement) {
      currentStepContentElement.classList.remove('step-visible');
      currentStepContentElement.classList.add('step-hidden');
    }

    const nextStepContentElement = document.getElementById(
      `step-${this.currentStep + 1}`
    );
    if (nextStepContentElement) {
      nextStepContentElement.classList.remove('step-hidden');
      nextStepContentElement.classList.add('step-visible');
    }
  }

  updateStepContentOnPrev() {
    const currentStepContentElement = document.getElementById(
      `step-${this.currentStep}`
    );
    if (currentStepContentElement) {
      currentStepContentElement.classList.remove('step-visible');
      currentStepContentElement.classList.add('step-hidden');
    }

    const prevStepContentElement = document.getElementById(
      `step-${this.currentStep - 1}`
    );
    if (prevStepContentElement) {
      prevStepContentElement.classList.remove('step-hidden');
      prevStepContentElement.classList.add('step-visible');
    }
  }

  get reviewData() {
    return [
      {
        icon: this.Car,
        title: 'Vehicle',
        items: [
          {
            label: 'Model',
            value: this.vehicleDataForm.get('vehicleModel')?.value,
          },
          {
            label: 'Type',
            value: this.vehicleDataForm.get('vehicleType')?.value,
          },
        ],
      },
      {
        icon: this.Settings,
        title: 'Engine',
        items: [
          {
            label: 'Capacity',
            value: this.vehicleDataForm.get('motorCapacity')?.value + ' L',
          },
          {
            label: 'Fuel Type',
            value: this.vehicleDataForm.get('fuelType')?.value,
          },
        ],
      },
      {
        icon: this.Palette,
        title: 'Appearance',
        items: [
          { label: 'Color', value: this.vehicleDataForm.get('color')?.value },
          {
            label: 'Wheel Orientation',
            value: this.vehicleDataForm.get('wheelOrientation')?.value,
          },
          {
            label: 'Condition',
            value: this.vehicleDataForm.get('vehicleCondition')?.value,
          },
        ],
      },
      {
        icon: this.CalendarDays,
        title: 'Year & Mileage',
        items: [
          {
            label: 'Manufacture Year',
            value: this.vehicleDataForm.get('manufactureYear')?.value,
          },
          {
            label: 'Mileage',
            value: this.vehicleDataForm.get('milage')?.value + ' km',
          },
        ],
      },
    ];
  }

  onChangeVehicleModel() {
    this.selectedVehicle =
      this.vehicleDataForm.get('vehicleModel')?.value || '';
  }

  getSelectedVehicleTypes(): string[] {
    const selectedModel = this.vehicles.find(
      (vehicle) => vehicle.model === this.selectedVehicle
    );
    return selectedModel ? selectedModel.types : [];
  }

  getSelectedVehicleEngineCapacities(): string[] {
    const selectedModel = this.vehicles.find(
      (vehicle) => vehicle.model === this.selectedVehicle
    );
    return selectedModel ? selectedModel.motorCapacity : [];
  }

  getSelectedVehicleEngineTypes(): string[] {
    const selectedModel = this.vehicles.find(
      (vehicle) => vehicle.model === this.selectedVehicle
    );
    return selectedModel ? selectedModel.motorTypes : [];
  }

  onClickPredictValue() {
    if (this.vehicleDataForm.invalid) {
      return;
    }

    const formValues = this.vehicleDataForm.value;
    const payload = {
      model: formValues.vehicleModel,
      motor_type: formValues.fuelType,
      wheel: formValues.wheelOrientation,
      color: formValues.color,
      type: formValues.vehicleType,
      status: formValues.vehicleCondition,
      motor_volume: Number(formValues.motorCapacity),
      running: formValues.milage + ' km',
      year: Number(formValues.manufactureYear),
    };

    this.http.post<{ predicted_price: number }>('http://localhost:8000/predict', payload).subscribe({
      next: (res) => {
        console.log('Data sent successfully', res);
        this.predictedPrice = res.predicted_price ?? null;
        this.updateStepContentOnNext();
        this.currentStep++;
      },
      error: (err) => {
        console.error('Error sending data', err);
      },
    });
  }
}
