import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetailPage } from './detail.page';
import { ReactiveFormsModule, FormControl, FormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { IonicStorageModule } from '@ionic/storage';

describe('DetailPage', () => {
  let component: DetailPage;
  let fixture: ComponentFixture<DetailPage>;

  const fakeActivatedRoute = {
    snapshot: { 
      data: {  }
    }
  } as ActivatedRoute;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailPage ],
      imports: [
        IonicModule.forRoot(),
        ReactiveFormsModule,
        FormsModule,
        IonicStorageModule.forRoot(),
        RouterModule.forRoot([])
      ],
      providers: [
        {provide: ActivatedRoute, useValue: fakeActivatedRoute}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
