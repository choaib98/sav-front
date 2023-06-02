import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavService {

  sav:{
    id   : string
    title: string
    icon  : string
    type : string
    link : string
  }
  

  constructor() {
    for(let i:number = 0; i < 10; i++){
      this.sav.id='sav'+i
      this.sav.title='demande'+i
      this.sav.icon='heroicons_outline:document-text',
      this.sav.type='basic',
      this.sav.link='/sav/control/'+i
    }
}
}
