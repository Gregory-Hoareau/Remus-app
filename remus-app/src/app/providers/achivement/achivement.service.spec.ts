import { TestBed } from '@angular/core/testing';

import { AchivementService } from './achivement.service';
import {CrowdsourcingService} from "../crowdsourcing/crowdsourcing.service";

describe('AchivementService', () => {
  let service: AchivementService;
  beforeEach(() =>{
    TestBed.configureTestingModule({
      providers:[AchivementService]
    });
    service = TestBed.get(AchivementService);
});

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('achivements list should be created', () => {
    expect(service.achivements).toBeTruthy();
  });
  it('avancee should be created', () => {
  expect(service.avancee).toBe(0);
  });
  it('partage should be created', () => {
    expect(service.partage).toBe(false);
  });
  it('should add a new Achivement', () => {
    service.addAchivement({titre: 'Carte', description: 'Trouver la carte', checked: false});
    expect(service.achivements.length).toBe(1);
    expect(service.achivements[0]).toEqual({titre: 'Carte', description: 'Trouver la carte', checked: false});
    service.addAchivement({titre: 'Carte2', description: 'Trouver la carte', checked: false});
    expect(service.achivements.length).toBe(2);
    expect(service.achivements[1]).toEqual({titre: 'Carte2', description: 'Trouver la carte', checked: false});
  });

  it('should valid an Achivement', () => {
    service.addAchivement({titre: 'Carte', description: 'Trouver la carte', checked: false});
    service.addAchivement({titre: 'Carte2', description: 'Trouver la carte', checked: false});
    service.validAchivement('Carte');
    expect(service.achivements[0].checked).toBe(true);
    expect(service.achivements[1].checked).toBe(false);
    service.validAchivement('Carte2');
    expect(service.achivements[0].checked).toBe(true);
    expect(service.achivements[1].checked).toBe(true);
  });

  it('should delete an Achivement', () => {
    service.addAchivement({titre: 'Carte', description: 'Trouver la carte', checked: false});
    service.addAchivement({titre: 'Carte2', description: 'Trouver la carte', checked: false});
    expect(service.achivements.length).toBe(2);
    service.remove(service.achivements[0]);
    expect(service.achivements[0]).toEqual({titre: 'Carte2', description: 'Trouver la carte', checked: false});
    expect(service.achivements.length).toBe(1);
    service.remove(service.achivements[0]);
    expect(service.achivements.length).toBe(0);
  });

  it('should setup the avancee',  () => {
    service.setUpAvancee();
    expect(service.avancee).toBe(0.0);
    service.addAchivement({titre: 'Carte', description: 'Trouver la carte', checked: false})
    service.setUpAvancee();
    expect(service.avancee).toBe(0.0);
    service.validAchivement('Carte');
    service.setUpAvancee();
    expect(service.avancee).toBe(1.0);
    service.addAchivement({titre: 'Carte2', description: 'Trouver la carte', checked: false})
    service.setUpAvancee();
    expect(service.avancee).toBe(0.5);
    service.validAchivement('Carte2');
    service.setUpAvancee();
    expect(service.avancee).toBe(1.0);
    service.remove(service.achivements[0]);
    service.setUpAvancee();
    expect(service.avancee).toBe(1.0);
  });
});
