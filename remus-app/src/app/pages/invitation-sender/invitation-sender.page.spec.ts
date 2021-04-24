import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InvitationSenderPage } from './invitation-sender.page';

describe('InvitationSenderPage', () => {
  let component: InvitationSenderPage;
  let fixture: ComponentFixture<InvitationSenderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvitationSenderPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InvitationSenderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
