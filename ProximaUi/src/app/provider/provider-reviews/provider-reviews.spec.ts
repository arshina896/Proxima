import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderReviews } from './provider-reviews';

describe('ProviderReviews', () => {
  let component: ProviderReviews;
  let fixture: ComponentFixture<ProviderReviews>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProviderReviews]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProviderReviews);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
