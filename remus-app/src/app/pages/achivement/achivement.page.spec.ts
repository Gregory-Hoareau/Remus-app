import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule,  } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import {ReactiveFormsModule } from '@angular/forms';
import {AchivementPage} from './achivement.page';

describe('AchivementPage', () => {
  let component: AchivementPage;
  let fixture: ComponentFixture<AchivementPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AchivementPage
      ],
      imports: [
        IonicModule.forRoot(),
        RouterTestingModule
      ],
      providers: [
        Location,
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AchivementPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
