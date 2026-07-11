import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderChat } from './provider-chat';

describe('ProviderChat', () => {
  let component: ProviderChat;
  let fixture: ComponentFixture<ProviderChat>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProviderChat]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProviderChat);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
