import { Component, OnInit } from '@angular/core';

import { Router, RouteConfigLoadStart, RouteConfigLoadEnd } from '@angular/router';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css']
})
export class BaseComponent  implements OnInit {
  
  constructor(router: Router){
    
  }

  ngOnInit(): void {
  }
}
