import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritoNewComponent } from './favorito-new.component';

describe('FavoritoNewComponent', () => {
  let component: FavoritoNewComponent;
  let fixture: ComponentFixture<FavoritoNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavoritoNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoritoNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
