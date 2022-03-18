import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress-step',
  templateUrl: './progress-step.component.html',
  styleUrls: ['./progress-step.component.scss']
})
export class ProgressStepComponent implements OnInit {
  listItem = [{id:1,step:'Thông tin khách hàng',status:true},
    {id:2,step:'Cài đặt Pin',status:true},
    {id:3,step:'E-Sign',status:false},
    {id:4,step:'Xác minh thông tin',status:false},
    {id:5,step:'Hoàn thành',status:false},
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
