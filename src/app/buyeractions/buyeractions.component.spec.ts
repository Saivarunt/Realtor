import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyeractionsComponent } from './buyeractions.component';

describe('BuyeractionsComponent', () => {
  let component: BuyeractionsComponent;
  let fixture: ComponentFixture<BuyeractionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyeractionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuyeractionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
