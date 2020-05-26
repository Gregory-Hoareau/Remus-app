import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule, NavParams } from '@ionic/angular';

import { JoinFormPage } from './join-form.page';
import { ReactiveFormsModule } from '@angular/forms';

describe('JoinFormPage', () => {
  let component: JoinFormPage;
  let fixture: ComponentFixture<JoinFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JoinFormPage ],
      imports: [
        IonicModule.forRoot(),
        ReactiveFormsModule,
      ],
      providers: [
        NavParams,
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(JoinFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
