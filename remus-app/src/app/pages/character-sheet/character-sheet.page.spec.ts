import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule, NavParams } from '@ionic/angular';

import { CharacterSheetPage } from './character-sheet.page';
import { MatExpansionModule } from '@angular/material/expansion';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { File } from '@ionic-native/file/ngx';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientXsrfModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CharacterSheetPage', () => {
  let component: CharacterSheetPage;
  let fixture: ComponentFixture<CharacterSheetPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharacterSheetPage ],
      imports: [
        IonicModule.forRoot(),
        MatExpansionModule,
        BrowserAnimationsModule,
        FontAwesomeModule,
        HttpClientTestingModule
      ],
      providers: [
        ImagePicker,
        File,
        NavParams,
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CharacterSheetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
