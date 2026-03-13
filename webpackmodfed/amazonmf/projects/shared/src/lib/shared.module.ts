import { NgModule } from '@angular/core';
import { SharedComponent } from './shared.component';
import { HeaderComponent } from './components/header/header.component';



@NgModule({
  declarations: [
    SharedComponent,
    //HeaderComponent
  ],
  imports: [
  ],
  exports: [
    SharedComponent
  ]
})
export class SharedModule { }
