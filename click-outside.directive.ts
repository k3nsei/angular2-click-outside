import {Directive, OnInit, OnDestroy, Output, EventEmitter, HostListener} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/do';

@Directive({
  selector: '[click-outside]'
})

export class ClickOutside implements OnInit, OnDestroy {
  private listening:boolean;
  private globalClick:Observable<MouseEvent>;

  @Output('clickOutside') clickOutside:EventEmitter<Object>; 

  constructor() {
    this.listening = false;
    this.clickOutside = new EventEmitter();
  }

  ngOnInit() {
    this.globalClick = Observable
      .fromEvent(document, 'click')
      .delay(1)
      .do(() => {
        this.listening = true;
      }).subscribe((event:MouseEvent) => {
        this.onGlobalClick(event);
      });
  }
  
  ngOnDestroy() {
    this.globalClick.unsubscribe();
  }

  onGlobalClick(event:MouseEvent) {
    if (event instanceof MouseEvent && this.listening === true) {
      this.clickOutside.emit({
        target: (event.target || null),
        value: true
      });
    }
  }
  
  @HostListener('click', ['$event'])
  onHostClick(event:MouseEvent) {
    if (event instanceof MouseEvent) {
      event.stopPropagation();

      this.clickOutside.emit({
        target: (event.target || null),
        value: false
      });
    }
  }
}
