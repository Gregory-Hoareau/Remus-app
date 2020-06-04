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

  it('should have an icon of eye', ()=>{
    expect(component.eye).toBeDefined();
  });

  it('should have a list of achivements', ()=>{
    expect(component.achivements).toBeDefined();
  });

  it('should have a list of players', ()=>{
    expect(component.players).toBeDefined();
  });

  it('should have a list of avancee', ()=>{
    expect(component.avancee).toBeDefined();
  });
  it('should add a new achivement', ()=>{
    component.addAchivement({titre:'Carte', description: 'Trouver la carte'});
    expect(component.achivements.length).toBe(1);
    expect(component.achivements[0]).toEqual({titre: 'Carte', description: 'Trouver la carte', checked:false});
    expect(component.avancee).toBe(0.0);
  });
  it('should valid an achivement', () => {
    component.addAchivement({titre: 'Carte', description: 'Trouver la carte'});
    component.addAchivement({titre: 'Carte2', description: 'Trouver la carte'});
    expect(component.avancee).toBe(0.0);
    component.validAchivement( 'Carte');
    expect(component.achivements[0].checked).toBe(true);
    expect(component.avancee).toBe(0.5);
    component.validAchivement( 'Carte2');
    expect(component.achivements[1].checked).toBe(true);
    expect(component.avancee).toBe(1);
  });

  it('should delete an achivement', () => {
    component.addAchivement({titre: 'Carte', description: 'Trouver la carte'});
    component.addAchivement({titre: 'Carte2', description: 'Trouver la carte'});
    component.validAchivement( 'Carte2');
    component.trash(component.achivements[0]);
    expect(component.achivements.length).toBe(1);
    expect(component.achivements[0]).toEqual({titre: 'Carte2', description: 'Trouver la carte', checked:true});
    expect(component.avancee).toBe(1.0);
    component.trash(component.achivements[0]);
    expect(component.achivements.length).toBe(0);
    expect(component.avancee).toBe(0.0);
  });
});
