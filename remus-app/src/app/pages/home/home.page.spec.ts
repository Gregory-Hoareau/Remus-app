import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule, IonRouterOutlet } from '@ionic/angular';

import { HomePage } from './home.page';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { ViewContainerRef } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, RouterModule } from '@angular/router';
import { routes } from '../../app-routing.module';
import { Location } from '@angular/common';
import { HostFormPage } from '../host-form/host-form.page';
import { HostFormPageModule } from '../host-form/host-form.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('HomePage', () => {
  let component: HomePage;
  let router: Router;
  let location: Location;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        HomePage,
        HostFormPage,
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
    location = TestBed.get(Location)

    fixture = TestBed.createComponent(HomePage);
    router.initialNavigation();
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
