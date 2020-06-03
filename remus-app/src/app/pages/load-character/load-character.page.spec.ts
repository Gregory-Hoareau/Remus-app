import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LoadCharacterPage } from './load-character.page';
import { File } from '@ionic-native/file/ngx';
import { FileMock } from '@ionic-native-mocks/file';

describe('LoadCharacterPage', () => {
  let component: LoadCharacterPage;
  let fixture: ComponentFixture<LoadCharacterPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadCharacterPage ],
      providers: [
        {provide: File}
      ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LoadCharacterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
