import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GeneratorChoicePage } from './generator-choice.page';

describe('GeneratorChoicePage', () => {
  let component: GeneratorChoicePage;
  let fixture: ComponentFixture<GeneratorChoicePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneratorChoicePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GeneratorChoicePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
