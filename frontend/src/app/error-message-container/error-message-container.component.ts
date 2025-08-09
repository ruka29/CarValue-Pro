import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ErrorMsgService } from '../services/error-msg.service';

@Component({
  selector: 'app-error-message-container',
  imports: [],
  templateUrl: './error-message-container.component.html',
  styleUrl: './error-message-container.component.scss'
})
export class ErrorMessageContainerComponent implements OnInit {
  public errorText: string = '';
  private timeOutId: any;

  @ViewChild('errorMessageRef') errorMessageRef!: ElementRef;

  constructor(private errorMsgService: ErrorMsgService) {}

  ngOnInit() {
    this.errorMsgService.getError().subscribe((message: string) => {
      this.errorText = message;
      this.showError();
    });
  }

  showError() {
    if (this.errorMessageRef) {
      const element = this.errorMessageRef.nativeElement;

      element.classList.remove('hidden');
      element.classList.add('block');

      if (this.timeOutId) {
        clearTimeout(this.timeOutId);
      }

      this.timeOutId = setTimeout(() => {
        element.classList.remove('block');
        element.classList.add('hidden');
        this.errorText = '';
      }, 5000);
    }
  }
}
