import {Component, OnInit, forwardRef, Input, Output, EventEmitter} from "@angular/core";
import {ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR} from "@angular/forms";
import {NgClass, NgIf} from "@angular/common";

@Component({
  selector: "app-checkbox",
  standalone: true,
  templateUrl: "./checkbox.component.html",
  styleUrls: ["./checkbox.component.scss"],
  imports: [
    FormsModule,
    NgClass,
    NgIf,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true
    }
  ]
})

export class CheckboxComponent implements ControlValueAccessor, OnInit {
  @Input('checked')
  @Input() disabled:boolean = false
  @Output() onCheck: EventEmitter<any> = new EventEmitter()

  checked: boolean = false;

  ngOnInit(): void {
  }

  onChange: any = () => {
  };
  onTouch: any = () => {
  };

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  writeValue(checked: boolean) {
    this.checked = checked;
  }

  onModelChange(e: boolean) {
    this.checked = e;
    this.onChange(e);
    this.onCheck.emit(e);
  }

}
