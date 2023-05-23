import {Component, Input} from '@angular/core';
import {Dealer} from "../dealer";
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dealer-details-modal',
  templateUrl: './dealer-details-modal.component.html',
  styleUrls: ['./dealer-details-modal.component.css']
})
export class DealerDetailsModalComponent {
  @Input() dealer: Dealer | null = null;

  constructor(public activeModal: NgbActiveModal) {
  }

  onCloseModal() {
    this.activeModal.close();
  }
}
