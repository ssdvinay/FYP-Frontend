import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllshowroomsComponent } from './allshowrooms.component';

describe('AllshowroomsComponent', () => {
  let component: AllshowroomsComponent;
  let fixture: ComponentFixture<AllshowroomsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllshowroomsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllshowroomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
