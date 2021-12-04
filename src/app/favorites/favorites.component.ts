import { Component, OnInit, Input } from '@angular/core';
import axios from 'axios';
import { never } from 'rxjs';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  @Input() allfavorites:any;
  favoritesDetails: any = []

  APIKEY1 = 'vvhql7t9pBOJllBscOHjUexL8lEAIje8'
  APIKEY2 = 'aqFxufOxgFGP6oXmz2HT6OGHpBTFQeXl'

  constructor() { }

  ngOnInit(): void {
    this.getFavoritesData()
  }

  getFavoritesData() {
    for(let i=0; i<this.allfavorites.length; i++){
      try {
        axios.get(`http://dataservice.accuweather.com/currentconditions/v1/${this.allfavorites[i].cityKey}?&apikey=${this.APIKEY1}&metric=true`)
        .then(
            (res) => {
              if(res.status == 200){
                let current = {
                  name: '',
                  temp: '',
                  unit: '',
                  icon: '',
                  text:''
                }
                const {data} = res
                current.name = this.allfavorites[i].cityName
                current.temp = data[0].Temperature.Metric.Value
                current.unit = data[0].Temperature.Metric.Unit
                current.icon = data[0].WeatherIcon
                current.text = data[0].WeatherText
                this.favoritesDetails.push(current)
              }
            }
          ); 
      } catch(err) {
          console.log(err);
      }


    }
    

  }

}
