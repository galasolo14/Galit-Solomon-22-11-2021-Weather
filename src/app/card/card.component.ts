import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() days:any;
  @Input() citis:any;
  weekDays:Array<string> = ['Sun', 'Mon', 'Tue', 'Wed', 'The', 'Fri', 'Set']
  newOeder:Array<string> = []
  
  constructor() { }

  ngOnInit(): void {
    this.getTodayDay()
  }

  getTodayDay(){
    const d = new Date();
    let day = d.getDay()
    this.newOeder = [...this.weekDays];
    for(let i=0; i<day; i++){
      this.newOeder.splice(0,1)
      this.newOeder.push(this.weekDays[i])
    }
    
  }
  

}
