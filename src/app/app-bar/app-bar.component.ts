import { Component, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-app-bar',
  templateUrl: './app-bar.component.html',
  styleUrls: ['./app-bar.component.css']
})
export class AppBarComponent implements OnInit {
  showFavorites: boolean = false;
  favorites = [];

  constructor() { }

  onClickCity() {
    this.showFavorites= false
  }

  onClickFavorites() {
    this.showFavorites= true
  }

  ngOnInit(): void {
    this. getFavorites();
  }

  getFavorites() {
    try {
      axios.get('/api/favorites')
      .then(
          (res) => {
            if(res.status == 200){
              const { dataFavorites } = res.data
              this.favorites = dataFavorites
            }
          }
        ); 
    } catch(err) {
        console.log(err);
    }
  }

  getNewFavotirs(){
    this.getFavorites();
  }
    
}
