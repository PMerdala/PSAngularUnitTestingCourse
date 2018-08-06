import { Location } from '@angular/common';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs/observable/of';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { HeroDetailComponent } from './hero-detail.component';
import {By} from '@angular/platform-browser';

describe('HeroDetailComponent', () => {
  let fixture : ComponentFixture<HeroDetailComponent>;
  let component : HeroDetailComponent;
  let hero : Hero;
  let mockHeroService;
  let mockActivatedRoute;
  let mockLocation;

  beforeEach(async() => {
    hero = { id: 1, name: 'SuperDude', strength: 50 };

    mockHeroService = jasmine.createSpyObj('HeroService', ['getHero', 'updateHero']);
    mockHeroService.getHero.and.returnValue(of(hero));
    mockLocation = jasmine.createSpyObj('Location', ['back']);
    mockActivatedRoute = {
      snapshot: { paramMap: { get: () => '3' } },
    };

    TestBed.configureTestingModule({
      declarations: [HeroDetailComponent],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: HeroService, useValue: mockHeroService },
        { provide: Location, useValue: mockLocation },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroDetailComponent);
    component = fixture.componentInstance;

    fixture.componentInstance.hero = hero;
    fixture.detectChanges();
  });

  it('should call getHero on component init', () => {
    const spy = spyOn(fixture.componentInstance, 'getHero');

    fixture.componentInstance.ngOnInit();

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should call heroService.getHero with hero id and set hero property based on response', () => {
    const thirdHero = { id: 3, name: 'SpiderDude', strength: 100 };
    console.log(mockHeroService.getHero.and.calls.reset());
    mockHeroService.getHero.and.returnValue(of(thirdHero));

    fixture.componentInstance.getHero();

    expect(mockHeroService.getHero).toHaveBeenCalledTimes(1);
    expect(mockHeroService.getHero).toHaveBeenCalledWith(3);
    expect(fixture.componentInstance.hero).toEqual(thirdHero);
  });

  it('should call location.back when user clicks back button', () => {
    fixture.debugElement.queryAll(By.css('button'))[0].triggerEventHandler('click', {});

    expect(mockLocation.back).toHaveBeenCalledTimes(1);
  });

  it('should call heroService.updateHero and then goBack', () => {
    const spy = spyOn(fixture.componentInstance, 'goBack');

    fixture.debugElement.queryAll(By.css('button'))[1].triggerEventHandler('click', {});

    expect(mockHeroService.updateHero).toHaveBeenCalledWith(hero);
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
