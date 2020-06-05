import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CanvasPage } from './canvas.page';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { Base64ToGallery } from '@ionic-native/base64-to-gallery/ngx';

describe('CanvasPage', () => {
  let component: CanvasPage;
  let fixture: ComponentFixture<CanvasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CanvasPage],
      imports: [
        IonicModule.forRoot(),
        ReactiveFormsModule,
        FormsModule
      ],
      providers: [
        AndroidPermissions,
        ScreenOrientation,
        Base64ToGallery
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CanvasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be same image', () => {
    const img = new Image();
    img.src = component.image;
    expect(component.loadImage(component.image)).toEqual(img);
  });

  it('should set then export the same image', () => {
    const trueImg = component.loadImage(component.image);
    component.setBackground(trueImg);
    component.exportEditedImage();
    expect(component.testImage).toEqual(component.image);

  });
});
