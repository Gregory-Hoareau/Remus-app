import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LoadCharacterPage } from './load-character.page';
import { File } from '@ionic-native/file/ngx';
import { FileMock } from '@ionic-native-mocks/file';
import { all_characters } from 'src/mocks/Character';
import { By } from '@angular/platform-browser';

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

  it('should have an attribute characters', () => {
    expect(component.characters).toBeDefined()
  });

  it('should display nothing if characters is empty', () => {
    const list = fixture.debugElement.query(By.css('.character-list'));
    expect(list.nativeElement.children.length).toBe(0);
  });

  it('should display the charaters', () => {
    component.characters = all_characters;
    fixture.detectChanges()
    const list = fixture.debugElement.query(By.css('.character-list'));
    expect(list.nativeElement.children.length).toBeGreaterThan(0);
  });
});
