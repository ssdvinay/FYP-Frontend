import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealerloginComponent } from './dealerlogin.component';

describe('DealerloginComponent', () => {
  let component: DealerloginComponent;
  let fixture: ComponentFixture<DealerloginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DealerloginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DealerloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
