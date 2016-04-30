import {Directive, Output, EventEmitter, ElementRef} from 'angular2/core';
import {Observable} from 'rxjs/Observable';
import * as helpers from './utils/helpers';

@Directive({
  selector: '[click-outside]',
  host: {
    '(document:click)': 'onClick($event)'
  }
})

export class ClickOutside {
  private listening:boolean = false;

  @Output('clicked') clicked:EventEmitter<boolean> = new EventEmitter();

  constructor(private _elRef:ElementRef) {
    Observable.of(null).delay(1).do(() => {
      this.listening = true;
    }).toPromise();
  }

  onClick(event:MouseEvent) {
    if (this.listening && event instanceof MouseEvent) {
      if (helpers.isDescendant(this._elRef.nativeElement, event.target) === true) {
        this.clicked.emit(false);
      } else {
        this.clicked.emit(true);
      }
    }
  }
}
