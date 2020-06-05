import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NotesPage } from './notes.page';
import { IonicStorageModule } from '@ionic/storage';
import { RouterModule } from '@angular/router';

class MockStorage {}

describe('NotesPage', () => {
  let component: NotesPage;
  let fixture: ComponentFixture<NotesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotesPage ],
      imports: [
        IonicModule.forRoot(),
        IonicStorageModule.forRoot(),
        RouterModule.forRoot([])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NotesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
