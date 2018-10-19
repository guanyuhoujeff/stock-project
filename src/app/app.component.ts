import { print } from 'util';
import { Component, OnInit } from '@angular/core';
import { CommonService } from './common.service';

import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { from } from "rxjs";



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  title = 'stock-project';

  fundDataDate = [];
  fundDataPrice = [];
  fundDataRedP = [];
  fundDataBlueP = [];
  checked = false;
  chartOptions;
  chartData;
  chartLabels;
  lineChartColors;




  constructor(private newService: CommonService, ) {
  }

  ngOnInit(): void {
    from(this.newService.getFund())
      .subscribe(req => {
        let data = JSON.parse(req["_body"])
        data.map(item => {
          this.fundDataDate.push(item["date"]),
            this.fundDataPrice.push(item["price"]),
            this.fundDataRedP.push(item["redP"]),
            this.fundDataBlueP.push(item["blueP"])
        }
        )
      });
  }





  showPlot() {
    this.checked = true;
    this.chartOptions = {
      responsive: true,
    };
    this.chartData = [
      { data: this.fundDataPrice, label: 'Price' },
      { data: this.fundDataRedP, label: 'RedP' },
      { data: this.fundDataBlueP, label: 'BlueP' },
    ];
    this.chartLabels = this.fundDataDate;
    this.lineChartColors = [
      { // 價格　　rgba(136, 136, 145, 1)
        pointRadius: 0.2,   // 點半徑
        borderWidth: 0.5,   // 點跟點連接時的線寬度
        lineTension: 0,   // 線的特效之類的
        fill: true,  // 要不要有點下面的背景
        backgroundColor: 'rgba(0, 0, 0, 0.1)',　　// 點下面的背景及Legend的顏色
        borderColor: 'rgba(148,159,177,1)',　　　　　　// 點與點連接線的顏色
        pointBackgroundColor: 'rgba(148,159,177,1)',　//點的顏色
        pointBorderColor: '#fff',　　　　　　　　　　　　//　點邊界的顏色
        pointHoverBackgroundColor: '#fff',　　　　　　//　點被選到時的顏色
        pointHoverBorderColor: 'rgba(148,159,177,0.8)'//　點邊界被選到時的顏色
      },
      { // 紅燈
        pointRadius: 1,
        borderWidth: 0.5,
        lineTension: 0,
        fill: false,
        backgroundColor: 'rgba(198, 12, 89, 0.78)',
        borderColor: 'rgba(255, 255, 255, 0)',
        pointBackgroundColor: 'rgba(198, 12, 89, 0.78)',
        pointBorderColor: 'rgba(168, 0, 0, 1)',
        pointHoverBackgroundColor: 'rgba(255, 10, 10, 1)',
        pointHoverBorderColor: 'rgba(255, 10, 10, 1)'
      },
      { // 藍燈
        pointRadius: 1,
        borderWidth: 0.5,
        lineTension: 0,
        fill: false,
        backgroundColor: 'rgba(12, 173, 198, 0.78)',
        borderColor: 'rgba(255, 255, 255, 0)',
        pointBackgroundColor: 'rgba(12, 173, 198, 0.78)',
        pointBorderColor: 'rgba(10, 153, 255, 1)',
        pointHoverBackgroundColor: 'rgba(10, 104, 255, 1)',
        pointHoverBorderColor: 'rgba(10, 104, 255, 1)'
      }
    ];
    // this.chartData = [
    //   // { data: [1.2, 600, 260, 700, 111], label: 'Account A' },
    //   // { data: [120, 455, 100, 340, 111], label: 'Account B' },
    //   { data: [1.44, 2.41, 22, 21.33, 13.445, undefined, 21, 14, 44], label: 'Account C' }
    // ];
    // this.chartLabels = ['January', 'February', 'Mars', 'April', "A", "A", "A", "A", "A", "A"];

  }
  onChartClick(event) {
    // console.log("this.fundDataPrice ", this.chartData);
    // console.log("this. chartLabels ", this.chartLabels);
    console.log("event fundDataRedP  ", this.fundDataRedP);
  }


}