import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MusicImporterPage } from './music-importer.page';

describe('MusicImporterPage', () => {
  let component: MusicImporterPage;
  let fixture: ComponentFixture<MusicImporterPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MusicImporterPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MusicImporterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
