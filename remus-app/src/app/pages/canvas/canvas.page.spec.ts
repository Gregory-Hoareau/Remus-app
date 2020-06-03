import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CanvasPage } from './canvas.page';

describe('CanvasPage', () => {
  let component: CanvasPage;
  let fixture: ComponentFixture<CanvasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CanvasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CanvasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
