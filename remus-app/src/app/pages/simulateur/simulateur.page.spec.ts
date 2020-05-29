import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SimulateurPage } from './simulateur.page';
import { Location, LocationStrategy } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('SimulateurPage', () => {
  let component: SimulateurPage;
  let fixture: ComponentFixture<SimulateurPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimulateurPage ],
      imports: [
        IonicModule.forRoot(),
        RouterTestingModule,
      ],
      providers: [
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(SimulateurPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
