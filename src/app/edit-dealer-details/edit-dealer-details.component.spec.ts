import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDealerDetailsComponent } from './edit-dealer-details.component';

describe('EditDealerDetailsComponent', () => {
  let component: EditDealerDetailsComponent;
  let fixture: ComponentFixture<EditDealerDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDealerDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditDealerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
