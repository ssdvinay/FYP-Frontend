import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlldealersComponent } from './alldealers.component';

describe('AlldealersComponent', () => {
  let component: AlldealersComponent;
  let fixture: ComponentFixture<AlldealersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlldealersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlldealersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
