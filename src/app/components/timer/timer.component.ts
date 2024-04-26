import {ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, NgZone, OnInit} from '@angular/core';
import {ITimeValue} from "../../models/add-page";
import {differenceInSeconds} from "date-fns";

type Timer = ReturnType<typeof setInterval>

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimerComponent implements OnInit {
  @Input() initialTime!: ITimeValue;
  formattedTime: string = '';
  totalSeconds!: number;

  constructor(private cdr: ChangeDetectorRef, private elRef: ElementRef, private zone: NgZone) {
  }

  convertTime(timerInterval?: Timer) {
    const initialDate = new Date().setHours(this.initialTime.hour, this.initialTime.minute, this.initialTime.second)
    const seconds = differenceInSeconds(initialDate, new Date());

    const duration = {
      hours: Math.floor(seconds / 3600),
      minutes: Math.floor((seconds % 3600) / 60),
      seconds: seconds % 60
    };

    if (duration.hours === 0) {
      this.elRef.nativeElement.classList.add('lessThanAnHour')
    }

    this.formattedTime = `
    ${duration.hours === 0 ? '' : duration.hours + 'h'}
    ${duration.minutes === 0 ? '' : duration.minutes + 'm'}
    ${duration.seconds}s
    `;
    this.cdr.detectChanges();

    if (duration.hours <= 0 && duration.minutes <= 0 && duration.seconds <= 0) {
      if (timerInterval !== undefined) {
        clearInterval(timerInterval as Timer);
      }
      this.formattedTime = '0h 0m 0s'
      this.cdr.detectChanges();
    }
  }

  startTimer(): void {
    this.totalSeconds = this.initialTime.hour * 3600 + this.initialTime.minute * 60 + this.initialTime.second;
    this.convertTime()
    this.zone.runOutsideAngular(() => {
      const timerInterval: Timer = setInterval(() => {
        this.convertTime(timerInterval)
      }, 1000);
    })
  }

  ngOnInit() {
    this.startTimer()
  }
}
