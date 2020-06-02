import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SessionChatPage } from './session-chat.page';

describe('SessionChatPage', () => {
  let component: SessionChatPage;
  let fixture: ComponentFixture<SessionChatPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SessionChatPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SessionChatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
