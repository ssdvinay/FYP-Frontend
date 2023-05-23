import {Component, Input} from '@angular/core';
import {Customer} from "../customer";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-customer-details-modal',
  templateUrl: './customer-details-modal.component.html',
  styleUrls: ['./customer-details-modal.component.css']
})
export class CustomerDetailsModalComponent {
  @Input() customer: Customer | null = null;

  constructor(public activeModal: NgbActiveModal) {
  }

  onCloseModal() {
    this.activeModal.close();
  }
}
