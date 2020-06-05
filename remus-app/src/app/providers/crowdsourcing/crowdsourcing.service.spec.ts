import { TestBed } from '@angular/core/testing';

import { CrowdsourcingService } from './crowdsourcing.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CharacterSheet } from 'src/app/models/character-sheet.model';

const dummy_characters = [{
  id: 0,
  img: null,
  name: 'Merlin',
  age: 150,
  sex: 'Home',
  background: 'Vieux Druide',
  traits: [{
    name: 'Force',
    value: 5,
  }, {
    name: 'Endurance',
    value: 8,
  }, {
    name: 'Intelligence',
    value: 10,
  }, {
    name: 'Perception',
    value: 12,
  }, {
    name: 'Charisme',
    value: 8,
  }, {
    name: 'Dextérité',
    value: 3,
  }],
  skills: [
    {name: 'Enfant de la Nature'},
    {name: 'Langue Druidique'}
  ]
},
{
  id: 1,
  img: null,
  name: 'Iris',
  age: 25,
  sex: 'Femme',
  background: 'Jeune femme',
  traits: [{
    name: 'Force',
    value: 10,
  }, {
    name: 'Endurance',
    value: 15,
  }, {
    name: 'Intelligence',
    value: 10,
  }, {
    name: 'Perception',
    value: 8,
  }, {
    name: 'Charisme',
    value: 2,
  }, {
    name: 'Dextérité',
    value: 10,
  }],
  skills: [
    {name: 'Intuition primitive'}
  ]
}];


describe('CrowdsourcingService', () => {
  let httpMock: HttpTestingController;
  let service: CrowdsourcingService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
    ]});
    service = TestBed.get(CrowdsourcingService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(()=>{
    httpMock.verify();
  })
  

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should receive character sheet data from the server', ()=> {
    service.getCharacterSheets().subscribe((sheets)=> {
      expect(sheets.length).toBe(2);
      expect(sheets).toEqual(dummy_characters);
    });

    const request = httpMock.expectOne(service.character_sheet_url);
    expect(request.request.method).toBe('GET');
    request.flush(dummy_characters);
  });

  it('should add character sheet to the server data', () => {
    const new_char: CharacterSheet = {
      img: null, name: 'Bluh', age: 35, sex: 'F', background: 'Troll des montagnes',
      traits: [],
      skills: []
    }
    service.postCharacterSheet(new_char).subscribe(sheet=>{
      expect(sheet).toEqual(new_char);
    });

    const req = httpMock.expectOne(service.character_sheet_url);
    expect(req.request.method).toEqual('POST');
    req.flush(new_char);

  });
});
