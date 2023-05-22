import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealerCustomersListComponent } from './dealer-customers-list.component';

describe('DealerCustomersListComponent', () => {
  let component: DealerCustomersListComponent;
  let fixture: ComponentFixture<DealerCustomersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DealerCustomersListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DealerCustomersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
