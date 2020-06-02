import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule,  } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import {ReactiveFormsModule } from '@angular/forms';
import {AchivementPage} from './achivement.page';

describe('AchivementPage', () => {
  let component: AchivementPage;
  let router: Router;
  let location: Location;
  let fixture: ComponentFixture<AchivementPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
      ],
      imports: [
        IonicModule.forRoot(),
        RouterTestingModule,
        ReactiveFormsModule,
      ],
      providers: [
        Location,
      ]
    }).compileComponents();

    router = TestBed.get(Router);
    location = TestBed.get(Location);

    fixture = TestBed.createComponent(AchivementPage);
    router.initialNavigation();
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
