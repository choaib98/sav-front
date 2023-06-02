import { Component, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { HttpClient } from '@angular/common/http';
import { saveAs } from 'file-saver';

@Component({
    selector     : 'sav',
    templateUrl  : './sav.component.html',
    animations   : fuseAnimations,
    encapsulation: ViewEncapsulation.None,
   
})
export class SavComponent
{
  cin:string
  nom:string
  nature:string
  description:string
  titreFoncier:string
  montantHypo:number
  modeSignature:string


  constructor(private http:HttpClient) {
    this.cin="B-632349",
    this.nom="BEN ADDOU IDRISSI NAJIB",
    this.nature="Authentification mainlevée",
    this.description="description",
    this.titreFoncier="98395/05",
    this.montantHypo=17000,
    this.modeSignature="Sur place"
   }

  
  downloadPDF() {
    this.http.get('https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf', { responseType: 'blob' })
      .subscribe((response: any) => {
        const blob = new Blob([response.body], { type: 'application/pdf' });
        const filename = 'example.pdf';
        saveAs(blob, filename);
      });
  }
}
