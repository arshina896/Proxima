import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderChatList } from './provider-chat-list';

describe('ProviderChatList', () => {
  let component: ProviderChatList;
  let fixture: ComponentFixture<ProviderChatList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProviderChatList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProviderChatList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
