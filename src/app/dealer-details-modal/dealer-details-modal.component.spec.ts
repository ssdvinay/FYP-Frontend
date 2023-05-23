import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealerDetailsModalComponent } from './dealer-details-modal.component';

describe('DealerDetailsModalComponent', () => {
  let component: DealerDetailsModalComponent;
  let fixture: ComponentFixture<DealerDetailsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DealerDetailsModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DealerDetailsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
