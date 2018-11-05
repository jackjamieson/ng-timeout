# ng-timeout
Creates observables for user idle and timeout with manual interrupts.  Detects interrupts across browser tabs with [storage-emitter](https://github.com/alekseykulikov/storage-emitter).

## Installation

To install this library, run:

```bash
$ npm install ng-timeout --save
```

## Consuming library

Import library in any Angular application from your Angular `AppModule`:

```typescript
// Import library
import { NgTimeoutService } from 'ng-timeout';

@NgModule({
  declarations: [
    ...
  ],
  imports: [
    ...
  ],
  providers: [ NgTimeoutService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

To use the module I recommend injecting the service into your top level app component.  
From there you can control what causes interrruptions to the timers and how you want to handle idle or timeout.

```typescript
import { NgTimeoutService } from '../ng-timeout';

private idleState: string; // if you want to show the countdown for example

constructor( private timeoutService: NgTimeoutService ) {

  this.timeoutService.setTimeToIdle(60 * 10); // 10 minutes of no interrupts will set the user to idle
  this.timeoutService.setTimeToTimeout(60); // 1 minute of no timeout interrupts will set the user as timed out

  // subscribe to the idle observable
  this.timeoutService.watchIdle().subscribe((isIdle: boolean) => {
    if (isIdle) {
      //  do something if the user becomes idle
    }
  });

  this.timeoutService.watchTimeout().subscribe((countdown: string) => {
    this.idleState = countdown;
    if(+countdown <= 0){
      // do something about the timeout
    }
  });
}
```

Here is an example `@HostListener` for detecting keypress

```typescript
@HostListener('document:keypress', ['$event'])
handleKeyboardEvent(event: KeyboardEvent) {
  this.timeoutService.interruptIdle(); // interrupt the idle countdown and reset the timer if a key was pressed
  this.timeoutService.interruptTimeout(); // for illustration purposes we can also reset the timeout when a key is pressed

}
```



## Development
The parent Angular project is included with this so it should be easy to set up and update.
Follow Angular's guide on creating libraries.

- npm install
- edit projects/ng-timeout
- ng build ng-timeout
- output is in the dist folder


## License

MIT © [Jack Jamieson](mailto:jamieson.jack@gmail.com)
