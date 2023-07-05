import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealerComplainsComponent } from './dealer-complains.component';

describe('DealerComplainsComponent', () => {
  let component: DealerComplainsComponent;
  let fixture: ComponentFixture<DealerComplainsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DealerComplainsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DealerComplainsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
