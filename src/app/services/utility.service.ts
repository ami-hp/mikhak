import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor() {
  }

  startTimer(interval: any, self: {timeLeft : number}, callback: () => void): any {
    if (interval) {
      clearInterval(interval);
    }
    const newInterval = setInterval(() => {
      if (self.timeLeft > 0) {
        self.timeLeft--;
      } else {
        clearInterval(newInterval);
        callback();
      }
    }, 1000);
    return newInterval;
  }

  convertSecondsToMinutesSeconds(seconds: number): string {
    const minutes: number = Math.floor(seconds / 60);
    const remainingSeconds: number = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  }
}
