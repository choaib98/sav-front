import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, QueryList, Renderer2, ViewChild, ViewChildren, ViewEncapsulation } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { ActivatedRoute } from '@angular/router';
import { FuseCardComponent } from '@fuse/components/card';
import { OperationService } from '../service/operation.service';
import { Operation } from '../operation';
import { FormBuilder, FormGroup } from '@angular/forms';
import {  HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Document } from './document';
import { DemandeDoc } from './demande-doc';
import {  OnInit } from '@angular/core';
import { FuseAlertModule } from '@fuse/components/alert';
@Component({
    selector       : 'upload',
    templateUrl    : './creer-demandeSav.component.html',
    styles         : [
        `
        upload fuse-card {
                margin: 16px;
            }
        `
    ],
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreerDemandeSavComponent implements OnInit
{
    formData: FormGroup
    sucess: boolean;
    ngOnInit(): void {
        this.formData = this.formBuilder.group({
          files   : []
        });
      }
    @ViewChildren(FuseCardComponent, {read: ElementRef}) private _fuseCards: QueryList<ElementRef>;

    filters: string[] = ['all', 'article', 'listing', 'list', 'info', 'shopping', 'pricing', 'testimonial', 'post', 'interactive'];
    numberOfCards: any = {};
    selectedFilter: string = 'all';

    /**
     * Constructor
     */
    fileToUpload: File[]=[];
    files!: FileList;
    id=''
    idDoc:number[]=[]
    dataObject:Operation
    msgErr=''
    doc:any
    docs:any;
    nbrDoc:number
    errUpload:any
    selectedFiles?: FileList;
    progressInfos: any[] = [];
    message: string[] = [];
    erreur=false
    fileInfos?: Observable<any>;
    pieceChanged: Subject<DemandeDoc> = new Subject<DemandeDoc>();
    @ViewChild('monElement') monElement:  QueryList<ElementRef>;
   // uploadForm: FormGroup;
   constructor(private formBuilder: FormBuilder,private _renderer2: Renderer2,private http:HttpClient,private route:ActivatedRoute,private service:OperationService )
   {
       this.route.params.subscribe(data=>{
           this.id=data.id
           
       })
       this.service.getDocumentsByOperation(this.id).subscribe(res=>{
           console.log(res)
           this.docs=res
           this.nbrDoc=this.docs.length
          
           
       })
      
       this.service.getOneOperation(this.id).subscribe(res=>{
          this.dataObject=<Operation>res
       })

       this.service.getAllDocuments().subscribe(res=>{
           
           this.doc=res
       })

     // this.afficherId()
       
   
    

      
   }
    /**
     * Upload file to given piece
     *
     * @param piece
     * @param document
     */
    // 

    /**
     * Read the given file for demonstration purposes
     *
     * @param file
     */
    private _readAsDataURL(file: File): Promise<any> {
        // Return a new promise
        return new Promise((resolve, reject) => {

            // Create a new reader
            const reader = new FileReader();

            // Resolve the promise on success
            reader.onload = (): void => {
                resolve(reader.result);
            };

            // Reject the promise on error
            reader.onerror = (e): void => {
                reject(e);
            };

            // Read the file as the
            reader.readAsDataURL(file);
        });
    }
   uploadPiece(document: DemandeDoc, fileList: FileList): void {

    // Return if canceled
    if (!fileList.length) {
        return;
    }

   // const allowedTypes = ['image/jpeg', 'image/png'];
    const file = fileList[0];

    // Return if the file is not allowed
    // if (!allowedTypes.includes(file.type)) {
    //     return;
    // }

    this._readAsDataURL(file).then((data) => {

        // Update the file
        document.fileName = file.name;
        document.data = data;

        // Update the piece
        this.pieceChanged.next(document);
    });

    
    console.log(fileList)
    // console.log("+-+-+- piece", document);
}
 
    


 
 
    onFileSelected(event,index) {
        this.fileToUpload = event.target.files;
        this.files.item[index]=event.target.files ;
      }

      getDocumentId(id:any){
        // for(let d=0;d<this.nbrDoc;d++){
        //     this.idDoc.push(id)
            
        // }
        // console.log(this.idDoc)
        return id
      }
      selectFiles(event): void {
        this.message = [];
        this.progressInfos = [];
        this.selectedFiles = event.target.files;
      }

      trackByFn(index: number, item: any): any {
        return item.id || index;
    }


    //   uploadFiles(): void {
    //     this.message = [];
      
    //     if (this.selectedFiles) {
    //       for (let i = 0; i < this.selectedFiles.length; i++) {
    //         for(let j=0;j<this.doc1.length;j++){
    //             this.upload( this.selectedFiles[i],j);
    //             console.log(this.selectedFiles[i])
    //         }
            
    //       }
    //     }
        
    //   }
    // uploadDocument() {


       
           
    //     var formData: FormData = new FormData();
    
        
    //     for (let i = 0; i < this.files.length; i++) {
    //         formData.append('file[]', this.files.item(i));
    //         for(let j=0;j<this.doc1.length;j++){
    //             var endpoint = '/api/upload/'+this.id+'/'+j;
    //             var headers = new HttpHeaders();
    //             headers.append('Content-Type', 'multipart/form-data');
    //             headers.append('Accept', 'application/json');
        
    //             this.http.post(endpoint, formData, { headers: headers }).subscribe(
    //               data => console.log('success', data),
    //               error => console.log('error', error)
                  
    //             );
    //         }
    //       }
      //  formData.append('file', this.fileToUpload, this.fileToUpload.name);
        
       // console.log(form)
    
    





     

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * After view init
     */
    // ngAfterViewInit(): void
    // {
    //     // Calculate the number of cards
    //     this._calcNumberOfCards();

    //     // Filter the cards for the first time
    //     this._filterCards();
    // }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * On filter change
     *
     * @param change
     */
    onFilterChange(change: MatButtonToggleChange): void
    {
        // Set the filter
        this.selectedFilter = change.value;

        // Filter the cards
        this._filterCards();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    private _calcNumberOfCards(): void
    {
        // Prepare the numberOfCards object
        this.numberOfCards = {};

        // Prepare the count
        let count = 0;

        // Go through the filters
        this.filters.forEach((filter) => {

            // For each filter, calculate the card count
            if ( filter === 'all' )
            {
                count = this._fuseCards.length;
            }
            else
            {
                count = this.numberOfCards[filter] = this._fuseCards.filter(fuseCard => fuseCard.nativeElement.classList.contains('filter-' + filter)).length;
            }

            // Fill the numberOfCards object with the counts
            this.numberOfCards[filter] = count;
        });
    }

    /**
     * Filter the cards based on the selected filter
     *
     * @private
     */
    private _filterCards(): void
    {
        // Go through all fuse-cards
        this._fuseCards.forEach((fuseCard) => {

            // If the 'all' filter is selected...
            if ( this.selectedFilter === 'all' )
            {
                // Remove hidden class from all cards
                fuseCard.nativeElement.classList.remove('hidden');
            }
            // Otherwise...
            else
            {
                // If the card has the class name that matches the selected filter...
                if ( fuseCard.nativeElement.classList.contains('filter-' + this.selectedFilter) )
                {
                    // Remove the hidden class
                    fuseCard.nativeElement.classList.remove('hidden');
                }
                // Otherwise
                else
                {
                    // Add the hidden class
                    fuseCard.nativeElement.classList.add('hidden');
                }
            }
        });
    }




/*** */
handleFileInput(event) {
    this.fileToUpload.push(<File>event.target.files[0]);
  }
  visible:boolean=true

  
onSubmit():void {
 
    if (this.fileToUpload===undefined||this.fileToUpload==null ||this.fileToUpload.length===0) {
        // Si aucun fichier n'a été sélectionné, afficher une alerte d'erreur
        this.erreur = true;
        return;
    }else{
        this.erreur = false;
    }
 
    const formData: FormData = new FormData();
    let docsId=[];
    this.docs.forEach((doc,index) => {
        //alert(index)
        //docsId.push(doc.id);
        if(this.fileToUpload[index]!==undefined){
            formData.append('document', this.fileToUpload[index], this.fileToUpload[index].name);
        }
       
        
    });
    this.sucess=true
    this.visible=false
     //formData.append('document', this.fileToUpload[1], this.fileToUpload[1].name);
    // formData.append('document', this.fileToUpload[2], this.fileToUpload[2].name);
   // formData.append('document',docsId);
   
   
    let url = '/api/sav/upload/documents/'+this.route.snapshot.paramMap.get('dossierId')+'/'+this.route.snapshot.paramMap.get('id');
    this.http
    .post(url, formData, {observe: 'response'})
    .subscribe(
    (resp) => {
        console.log(JSON.stringify(resp));
    //   this.sucess=true;
    //   this.erreur=false;
    },
    err => {
      console.log(err);
     // this.sucess=false;
      this.erreur=true;
      this.sucess=false
      console.log(this.erreur)
    });

 }
   
}