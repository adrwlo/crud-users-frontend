import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  private spinnerVisible: boolean = false;

  constructor() { }

  setSpinnerVisible(spinnerVisible: boolean) {
    this.spinnerVisible = spinnerVisible;
  }

  getSpinnerVisible(): boolean {
    return this.spinnerVisible;
  }
}