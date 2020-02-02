import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() public sidenavToggle = new EventEmitter();
  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
  }
  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }
  login(){
    this.router.navigate(['/auth/user/login'])
    
  }
}
