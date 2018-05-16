import { Injectable } from '@angular/core';
import Hero from './hero';
import {Heroes} from './mock-heroes';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {MessageService} from './message.service';

@Injectable()
export class HeroService {

  constructor(private msgService: MessageService) { }

  getHeroes(): Observable<Hero[]> {
    this.msgService.add('Hero Service: fetched heroes');
    return of(Heroes);
  }

  getHero(id: Number): Observable<Hero> {
    this.msgService.add(`Hero Service: fetched hero id${id}`);
    return of(Heroes.find(hero => hero.id === id));
  }
}
