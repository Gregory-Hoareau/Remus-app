import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CrowdsourcingPage } from './crowdsourcing.page';

describe('CrowdsourcingPage', () => {
  let component: CrowdsourcingPage;
  let fixture: ComponentFixture<CrowdsourcingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrowdsourcingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CrowdsourcingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
