import { Component } from '@angular/core';
import { LoadingService } from 'src/app/services/loading2.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent {
  isLoading!: boolean;
  private unsubscribe$ = new Subject<void>();
  constructor(private loadingService: LoadingService) {
    this.loadingService.isLoading
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((isLoading) => {
        this.isLoading = isLoading as boolean;
      });
    this.loadingService.showLoading();
  }
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
