import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs/observable/of';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { Spied } from '../types/spied.type';

import { HeroSearchComponent } from './hero-search.component';
import { RouterModule } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';

fdescribe('HeroSearchComponent', () => {
  let fixture: ComponentFixture<HeroSearchComponent>;
  let component: HeroSearchComponent;
  let heroes: Hero[];
  let mockHeroService: Spied<HeroService>;

  beforeEach(async(() => {
    heroes = [
      { id: 1, name: 'SuperDude', strength: 50 },
      { id: 2, name: 'AwesomeDude', strength: 100 },
      { id: 3, name: 'MoreSuperDude', strength: 75 }
    ];
    mockHeroService = jasmine.createSpyObj('HeroService', ['searchHeroes']);
    mockHeroService.searchHeroes.and.callFake(term =>
      of(heroes.filter(hero => hero.name.includes(term)))
    );
    TestBed.configureTestingModule({
      declarations: [HeroSearchComponent],
      imports: [RouterModule],
      providers: [{ provide: HeroService, useValue: mockHeroService }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroSearchComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
  });

  it('should pass', () => {
    expect(true).toBe(true);
  });
});
