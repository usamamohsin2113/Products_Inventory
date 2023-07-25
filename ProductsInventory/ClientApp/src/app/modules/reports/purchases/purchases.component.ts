import { Component } from '@angular/core';
import { ReportsService } from '../../../services/reports.service';

@Component({
  selector: 'app-purchases',
  templateUrl: './purchases.component.html',
  styleUrls: ['./purchases.component.css']
})

export class PurchasesComponent {
  selectedType: string = 'daily';
  types: string[] = ['daily', 'monthly', 'yearly'];
  fromDate: Date = new Date();
  toDate: Date = new Date();
  chartData: any = [];

  constructor(private reportsService: ReportsService) { }

  getChart() {
    console.log("getting chart");
    this.reportsService.getPurchaseReport(this.fromDate, this.toDate, this.selectedType).subscribe((result: any) => {
      if (result.success) {
        this.chartData = result.data;
  

        console.log(this.chartData);
      }
    });
  }
}
