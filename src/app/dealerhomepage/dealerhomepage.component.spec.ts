import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealerhomepageComponent } from './dealerhomepage.component';

describe('DealerhomepageComponent', () => {
  let component: DealerhomepageComponent;
  let fixture: ComponentFixture<DealerhomepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DealerhomepageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DealerhomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
