import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelleractionsComponent } from './selleractions.component';

describe('SelleractionsComponent', () => {
  let component: SelleractionsComponent;
  let fixture: ComponentFixture<SelleractionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelleractionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelleractionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
