import { Injectable } from '@angular/core';
import Hero from './hero';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {MessageService} from './message.service';
import {catchError, map, tap} from 'rxjs/operators';

@Injectable()
export class HeroService {
  private heroesUrl = 'api/heroes';
  
  constructor(
    private http: HttpClient,
    private msgService: MessageService) { }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
               .pipe(
                 tap(heroes => this.log(`fetched heroes`)),                 
                 catchError(this.handleError('getHeroes', []))
               );
  }

  getHero(id: Number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;

    return this.http.get<Hero>(url)
                    .pipe(
                      tap(_ => this.log(`fetched herp id=${id}`)),
                      catchError(this.handleError<Hero>(`getHero id=${id}`))
                    )
  }

  updateHero (hero: Hero): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    
    return this.http.put(this.heroesUrl, hero, httpOptions)
                    .pipe(
                      tap(_ => this.log(`updated hero id ${hero.id}`)),
                      catchError(this.handleError<any>('update hero'))
                    );
  }

  private log(message: string) {
    this.msgService.add(`HeroService: ${message}`);
  }

  private handleError<T> (operation = 'operation', result?: T){
      return (error: any): Observable<T> => {
        console.error(error);
        this.log(`${operation} failed ${error.message}`);
        return of (result as T);
      }
  }
}
