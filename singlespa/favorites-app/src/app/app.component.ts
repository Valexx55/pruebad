import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';

interface FavoriteItem {
  id: number;
  title: string;
  summary: string;
  image_url: string;
  url: string;
}

interface FavoriteMessage {
  type: string;
  payload: FavoriteItem;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  favorites: FavoriteItem[] = [];
  channel = new BroadcastChannel('mf-channel');

  constructor(private ngZone: NgZone) {}

  ngOnInit(): void {
    const key = 'mf-favorites';

    const saved = localStorage.getItem(key);

    if (saved) {
      this.favorites = JSON.parse(saved);
    }

    this.channel.onmessage = (event: MessageEvent<FavoriteMessage>) => {
      this.ngZone.run(() => {
        if (event.data.type === 'news:add-favorite') {
          const item = event.data.payload;

          if (!this.favorites.some((f) => f.id === item.id)) {
            this.favorites.push(item);
            localStorage.setItem('mf-favorites', JSON.stringify(this.favorites));
          }

          console.log('Favorito recibido', item);
          console.log('Favorites actualizados', this.favorites);
        }
      });
    };
  }

  ngOnDestroy(): void {
    this.channel.close();
  }

  removeFavorite(id: number): void {
    this.favorites = this.favorites.filter((f) => f.id !== id);
    //TODO: eliminar favoritos del navegador
  }
}
