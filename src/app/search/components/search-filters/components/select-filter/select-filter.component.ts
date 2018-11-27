import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

interface IOption { name: string; id: string; }
interface SelectConfig {
  options: IOption[];
  selectedOption: IOption | null;
}
interface SelectionEmitter { prev: string, current: string }

@Component({
  selector: 'app-select-filter',
  templateUrl: './select-filter.component.html',
  styleUrls: ['./select-filter.component.less']
})
export class SelectFilterComponent implements OnInit {
  @Input() title: string;
  @Output() onSelected = new EventEmitter<SelectionEmitter>();
  @Input() selectConfig: SelectConfig;
  dropDownConfig: SelectConfig;
  prevSelection: IOption = { name: 'Most Recent', id: 'most_recent' };

  constructor() { }

  ngOnInit() {
    this.dropDownConfig = { ...this.selectConfig };
  }

  emitSelection(option: IOption) {
    if (this.prevSelection === option) { return; }
    this.onSelected.emit({
      prev: this.prevSelection.id, current: option.id
    });
    this.prevSelection = option;
  }

}
