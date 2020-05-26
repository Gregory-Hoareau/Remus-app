import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule, IonRouterOutlet } from '@ionic/angular';

import { SessionHomePage } from './sessionHome.page';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewContainerRef } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

describe('SessionHomePage', () => {
  let component: SessionHomePage;
  let fixture: ComponentFixture<SessionHomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SessionHomePage ],
      imports: [
        IonicModule.forRoot(),
        RouterTestingModule,
      ],
      providers: [
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
