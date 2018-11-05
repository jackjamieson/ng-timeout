import { Injectable } from '@angular/core';
import { interval, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import sEmitter from 'storage-emitter';

@Injectable({
  providedIn: 'root'
})
export class NgTimeoutService {


  private timeToIdle: number;
  private timeToTimeout: number;

  private isIdle: boolean;

  private timeDiff: number;

  private timestart: number;
  private timeend: number;

  constructor() {

    this.timeToIdle = 60 * 20; // default 20 min to be considered idle
    this.timeToTimeout = 60 * 1; // default timeout 1 min, usually we would log the user out here

    // set initial end time to now + time until user is considered idle
    this.timeend = Math.floor(new Date().getTime() / 1000) + this.timeToIdle + 1;

    // listen for the interrupt across browser tabs
    sEmitter.on('idle-interrupt', () => {
      if (!this.isIdle) {
        this.timeend = Math.floor(new Date().getTime() / 1000) + this.timeToIdle + 1;
      }
    });

    // listen for the timeout interrupt across browser tabs
    sEmitter.on('timeout-interrupt', () => {
      this.isIdle = false;
      this.timeend = Math.floor(new Date().getTime() / 1000) + this.timeToIdle + 1;
    });
  }



  // lets you perform actions after the user is deemed idle
  watchIdle(): Observable<any> {

    // check every 1 second to see if the difference in time between now and the time we set to determine idle has elapsed
    const timer = interval(1000).pipe(
      map((x) => {

        this.timestart = Math.floor(new Date().getTime() / 1000);
        this.timeDiff = this.timeend - this.timestart;

        if (this.timeDiff <= 0) {
          this.isIdle = true;
          return true;
        }
        return false;
      }));

    return timer; // we give this observable back so the user can handle what to do with it
  }

  // lets you perform actions after the user is deemed timed out
  // returns the countdown for timeout
  watchTimeout(): Observable<string> {
    let count = 0;
    const timer = interval(1000).pipe(map((x) => {

      if (this.isIdle) { count++; } else { count = 0; }
      return this.timeToTimeout - count + '';
    }));

    return timer;
  }

  interruptIdle(): void {
    // you can only interrupt the idle check if you are not already idle
    if (!this.isIdle) {
      this.timeend = Math.floor(new Date().getTime() / 1000) + this.timeToIdle + 1;
      sEmitter.emit('idle-interrupt');
    }
  }

  // resets the timeout by declaring that the user is not idle and updating the end time
  interruptTimeout(): void {
    this.isIdle = false;
    this.timeend = Math.floor(new Date().getTime() / 1000) + this.timeToIdle + 1;
    sEmitter.emit('timeout-interrupt');
  }

  // set the time in seconds to declare the user is idle
  setTimeToIdle(time: number): void {
    this.timeToIdle = time;
  }

  // set the time in seconds to declare the user has timed out
  setTimeToTimeout(time: number): void {
    this.timeToTimeout = time;
  }


}
