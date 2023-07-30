import {Component} from '@angular/core';
import {WorkHour} from "../work-hour";
import {ActivatedRoute, Router} from "@angular/router";
import {DealerApiService} from "../dealer-api-service";
import {HttpResponse} from "@angular/common/http";
import {Response} from "../response";
import {Util} from "../util";

@Component({
  selector: 'app-dealer-working-hours',
  templateUrl: './dealer-working-hours.component.html',
  styleUrls: ['./dealer-working-hours.component.css']
})
export class DealerWorkingHoursComponent {

  days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  times = Array.from({length: 24}, (_, i) => `${i.toString().padStart(2, '0')}:00`);
  workingHours: {
    [key: string]: {
      [key: string]: string
    }
  } = {};

  constructor(private apiService: DealerApiService, private route: ActivatedRoute, private router: Router) {
    this.initializeWorkingHours();
  }

  initializeWorkingHours() {
    for (const day of this.days) {
      this.workingHours[day] = {from: '09:00', to: '17:00'};
    }
  }

  onFromTimeSelected(day: string) {
    const validToTimes = this.getValidToTimes(day);
    this.workingHours[day]['to'] = validToTimes[1];
  }

  getValidToTimes(day: string): string[] {
    const selectedFrom = this.workingHours[day]['from'];
    const fromHour = +selectedFrom.slice(0, 2);

    // Filter out earlier times and return valid 'to' times
    return this.times.filter(time => +time.slice(0, 2) > fromHour);
  }

  onSaveTimeSlots() {
    const timeSlots: WorkHour[] = this.days.map(day => ({
      day: day,
      workFrom: this.workingHours[day]['from'],
      workTo: this.workingHours[day]['to']
    }));

    this.apiService.saveWorkHours(timeSlots).subscribe({
      next: (value: HttpResponse<Response<String>>) => {
        alert("Working hours updated!")
      },
      error: err => Util.handleUnauthorized(err, this.router),
    })
  }
}
