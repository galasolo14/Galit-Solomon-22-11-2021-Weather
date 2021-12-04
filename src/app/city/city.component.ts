import { Component, OnInit, Input } from '@angular/core';
import {Output, EventEmitter} from '@angular/core';
import axios from 'axios';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {
  @Input() allfavorites:any;
  @Output() fetchFavorites = new EventEmitter<object>();

  APIKEY = 'vvhql7t9pBOJllBscOHjUexL8lEAIje8';
  APIKEY2 = 'aqFxufOxgFGP6oXmz2HT6OGHpBTFQeXl';
  
  searchValue: string = '';
  options: any = [];

  currentCity: any = {name: 'Tel Aviv', key: 215854}
  selected = 'c';
  isFavorites: boolean = false;

  fiveDays: any = [];
  apiForcast: any = {};
  url = ''

  displayFunc(subject:any) {
    return subject ? subject.LocalizedName: undefined
  }

  constructor(private toastrService:ToastrService) { }

  ngOnChanges(): void {
    this.ckeckIfFavorite()
  }

  ckeckIfFavorite(){
    const result = this.allfavorites.find( (e:any) => e.cityName === this.currentCity.name)
    if(result){
      this.isFavorites = true
    }
    else this.isFavorites = false
  }

  ngOnInit(): void {
     this.fetchAPIData(215854);
  }

  onSearch(event: any) {
    this.searchValue = event.target.value
    this.getAPIAutocomplete();
  }

  clickOnFavorites() {
    this.isFavorites = !this.isFavorites;
    if(this.isFavorites === true){
      this.addToFavorite()
    }
    if(this.isFavorites === false){
      this.deleteFavorite()
    }
  }

  changeUnit(){
    this.fetchAPIData(this.currentCity.key);
  }

  getCity(index:any){
    this.currentCity.name = this.options[index].LocalizedName;
    this.currentCity.key = this.options[index].Key;
    this.ckeckIfFavorite()
    this.fetchAPIData(this.currentCity.key)
  }

  fetchAPIData(city:any){
    try {
      if(this.selected === 'c'){
        this.url = `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${city}?&apikey=${this.APIKEY}&metric=true`
      }
      if(this.selected === 'f'){
        this.url = `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${city}?&apikey=${this.APIKEY}`
      }
      axios.get(this.url)
      .then(
          (res) => {
            if(res.status == 200){
              const { DailyForecasts } = res.data
              this.apiForcast.cityName = DailyForecasts[0].Link.split("/")[5]
              this.apiForcast.icon = DailyForecasts[0].Day.Icon
              this.apiForcast.iconName =  DailyForecasts[0].Day.IconPhrase
              this.fiveDays = DailyForecasts
            }
          }
        ); 
    } catch(err) {
        console.log(err);
        this.errorMassage(err)
    }
  }

  getAPIAutocomplete(){
    try {
      axios.get(`http://dataservice.accuweather.com/locations/v1/cities/autocomplete?q=${this.searchValue}&apikey=${this.APIKEY}`)
      .then(
          (res) => {
            if(res.status == 200){
              this.options = res.data;
            }
          }
        ); 
    } catch(err) {
        console.log(err);
        this.errorMassage(err)
    }
  }

  addToFavorite(){
    if(this.isFavorites){
      try {
        axios.post('/api/favorites/add', {
          data: this.currentCity,
        })
        .then(
            (res) => {
              if(res.status == 200){
                this.fetchFavorites.emit();
              }
            }
          ); 
      } catch(err) {
        
          console.log(err);
          this.errorMassage(err)
      }
    }
   
  }

  deleteFavorite(){
    if(!this.isFavorites){
      try {
        axios.delete(`/api/favorites/delete/${this.currentCity.key}`)
        .then(
            (res) => {
              if(res.status == 200){
                this.fetchFavorites.emit();
              }
            }
          ); 
      } catch(err) {
          console.log(err);
          this.errorMassage(err)
      }
    }
    
  }

  errorMassage(message:any){
    this.toastrService.error(message, "Error")
  }

}
