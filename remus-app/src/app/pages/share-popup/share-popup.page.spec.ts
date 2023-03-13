import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule, NavParams } from '@ionic/angular';

import {SharePopupPage} from './share-popup.page';
import {File} from '@ionic-native/file/ngx';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { Camera } from '@ionic-native/camera/ngx';

describe('DocPopupPage', () => {
  let component: SharePopupPage;
  let fixture: ComponentFixture<SharePopupPage>;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharePopupPage ],
      imports: [IonicModule.forRoot()],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [File, UntypedFormBuilder, NavParams, Camera]
    }).compileComponents();

    fixture = TestBed.createComponent(SharePopupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
