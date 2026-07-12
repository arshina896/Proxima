import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerChatList } from './customer-chat-list';

describe('CustomerChatList', () => {
  let component: CustomerChatList;
  let fixture: ComponentFixture<CustomerChatList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerChatList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerChatList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
