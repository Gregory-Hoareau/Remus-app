import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule, NavParams } from '@ionic/angular';

import { CrowdsourcingPage } from './crowdsourcing.page';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

describe('CrowdsourcingPage', () => {
  let component: CrowdsourcingPage;
  let fixture: ComponentFixture<CrowdsourcingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrowdsourcingPage ],
      imports: [
        IonicModule.forRoot(),
        HttpClientTestingModule,
        RouterModule.forRoot([])
      ], providers: [
        NavParams,
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CrowdsourcingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
