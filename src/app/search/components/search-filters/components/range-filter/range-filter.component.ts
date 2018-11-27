import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IRange } from "public/store/search/search.reducer";

@Component({
  selector: 'app-range-filter',
  templateUrl: './range-filter.component.html',
  styleUrls: ['./range-filter.component.less']
})
export class RangeFilterComponent implements OnInit {
  @Input() title: string;
  @Input() min: string;
  @Input() max: string;
  @Output() onMaxRange = new EventEmitter<number>();
  @Output() onMinRange = new EventEmitter<number>();
  prevRange = {} as IRange;
  rangeVal = {} as IRange;

  constructor() { }

  ngOnInit() {
  }

  onSubmit() {
    const min = this.rangeVal.min;
    const max = this.rangeVal.max;

    if (this.rangeVal.min !== this.prevRange.min) {
      this.onMinRange.emit(min);
    }

    if (this.rangeVal.max !== this.prevRange.max) {
      this.onMaxRange.emit(max);
    }

    this.prevRange = { ...this.rangeVal };
  }

}
