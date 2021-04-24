import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CustomSheetPage } from './custom-sheet.page';

describe('CustomSheetPage', () => {
  let component: CustomSheetPage;
  let fixture: ComponentFixture<CustomSheetPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomSheetPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CustomSheetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
