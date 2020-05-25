import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import {DocPopupPage} from './doc-popup.page';

describe('DocPopupPage', () => {
  let component: DocPopupPage;
  let fixture: ComponentFixture<DocPopupPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocPopupPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DocPopupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
