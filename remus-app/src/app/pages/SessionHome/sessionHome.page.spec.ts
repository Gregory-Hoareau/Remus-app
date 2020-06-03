import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule, IonRouterOutlet } from '@ionic/angular';
import {File} from '@ionic-native/file/ngx';
import { SessionHomePage } from './sessionHome.page';
import { ActivatedRoute, Router, RouterModule, Params } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from 'src/app/app-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Observable } from 'rxjs';
import { IonicStorageModule } from '@ionic/storage';

describe('SessionHomePage', () => {
  let component: SessionHomePage;
  let fixture: ComponentFixture<SessionHomePage>;

  const fakeActivatedRoute = {
    queryParams: new Observable()
  } as ActivatedRoute;

  const fakeRoute = {
    getCurrentNavigation() {
      return {
        extras: {
          state: {},
        }
      }
    }
  } as Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SessionHomePage ],
      imports: [
        IonicModule.forRoot(),
        RouterTestingModule.withRoutes(routes),
        FontAwesomeModule,
        IonicStorageModule.forRoot()
      ],
      providers: [
        {provide: ActivatedRoute, useValue: fakeActivatedRoute},
        {provide: Router, useValue: fakeRoute },
        {provide: File}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SessionHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
