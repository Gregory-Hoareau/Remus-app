import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import {SharePopupPage} from './share-popup.page';

describe('DocPopupPage', () => {
  let component: SharePopupPage;
  let fixture: ComponentFixture<SharePopupPage>;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharePopupPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SharePopupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
