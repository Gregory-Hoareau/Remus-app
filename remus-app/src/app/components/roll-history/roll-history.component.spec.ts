import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RollHistoryComponent } from './roll-history.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('RollHistoryComponent', () => {
  let component: RollHistoryComponent;
  let fixture: ComponentFixture<RollHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RollHistoryComponent ],
      imports: [IonicModule.forRoot()],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(RollHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
