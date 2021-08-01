import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TransactionService } from 'app/services/transaction.service';
import { Chart } from "chart.js";
import { pluck } from "underscore";
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  record: Dashboard;
  bgColors = ["gold", "blue", "silver", "bronze", "red", "mauve", "yellow", "white"];
  pieChart: Chart;
  barChart: Chart;

  @ViewChild('pieChartCanvas', { static: false }) pieChartCanvas: ElementRef;
  @ViewChild('barChartCanvas', { static: false }) barChartCanvas: ElementRef;


  constructor(private dashboardService: TransactionService) { }

  ngOnInit() {
    this.fetchRecords();
  }



  // async loadStatistics(regionId?: number) {
  //   try {
  //     this.loading.start("Loading Statistics...");
  //     const stats = await this.statsService.dashboardStats(regionId);
  //     this.drawPavementTypeStats(this.createStatsObj(stats.pavementType));
  //     this.drawProductStats(this.createStatsObj(stats.surfaceType));
  //     this.roadStats = {
  //       networkSize: stats.networkSize,
  //       networkValue: stats.networkValue,
  //       totalRoad: stats.totalRoad
  //     };
  //   } catch (error) { } finally { this.loading.stop(); }

  // }

  // private createStatsObj(obj: any) {
  //   let res = [];
  //   keys(obj).forEach((k) => {
  //     res.push({ name: k, total: obj[k] });
  //   });
  //   return res;
  // }

  async fetchRecords() {
    this.record = await this.dashboardService.fetchDashboard()
    // this.records.subscribe(q => console.log(q))
    this.loadCharts(this.record)
  }


  bgColor(index) {
    return this.bgColors[index];
  }

  loadCharts(record) {
    this.drawBarChart(record)
    this.drawPieChart(record?.productSales)
  }


  private drawBarChart(stats: any) {
    const context = (<HTMLCanvasElement>this.barChartCanvas.nativeElement).getContext('2d');
    this.barChart = new Chart(context, {
      type: 'bar',
      data: {
        // labels: pluck(stats, 'product'),
        labels: [`Month of ${stats?.currentMonth}`],
        datasets: [{
          label: 'Sales',
          backgroundColor: 'rgb(0,99,132,0.7)',
          data: [stats?.currentMonthSales],

          borderWidth: 0
        },
        {
          label: 'Expenses',
          backgroundColor: 'rgb(200, 0,0, 0.7)',
          data: [stats?.currentMonthExpenses],
          borderWidth: 0
        },
        {
          label: 'Banking',
          backgroundColor: 'rgb(200, 97, 0,0.7)',
          data: [stats?.currentMonthBanking],
          borderWidth: 0
        }
        ]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              // suggestedMax: 10000,
              suggestedMin: 500
            },
          }]
        }
      }
    });
  }

  private drawPieChart(data: any) {
    console.log(data)
    let pieContext = (<HTMLCanvasElement>this.pieChartCanvas.nativeElement).getContext('2d');
    this.pieChart = new Chart(pieContext, {
      type: 'doughnut',
      data: {
        labels: pluck(data, 'product'),
        datasets: [{
          data: pluck(data, 'volume'),
          backgroundColor: [
            'rgba(255, 99, 133)',
            'rgba(54, 162, 235)',
            'rgba(255, 206, 86)',
            'rgba(75, 192, 192)',
            'rgba(153, 102, 255)',
            'rgba(255, 159, 64)'
          ]
        }]
      },
    });
  }

}




export interface Dashboard {
  YearSalesVolume: number
  yearSalesValue: number
  currentMonthSales: number
  currentMonthBanking: number
  currentMonthExpenses: number
  lastMonthSales: number
  lastMonthExpenses: number
  lastMonthBanking: number
  totalOutlets: number
  topOutlets: []
  productSales: []
}