import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule, NavParams } from '@ionic/angular';

import { HostFormPage } from './host-form.page';
import { ReactiveFormsModule } from '@angular/forms';

describe('HostFormPage', () => {
  let component: HostFormPage;
  let fixture: ComponentFixture<HostFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HostFormPage ],
      imports: [
        IonicModule.forRoot(),
        ReactiveFormsModule,
      ],
      providers: [
        NavParams,
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HostFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
