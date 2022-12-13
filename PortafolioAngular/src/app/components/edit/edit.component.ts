import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/services/projetc.services';
import { UploadServices } from 'src/app/services/upload.services';
import { Global } from 'src/app/services/global';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-edit',
  templateUrl: '../create/create.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [ProjectService, UploadServices]
})
export class EditComponent implements OnInit {
  public title: string;
  public project: Project;
  public saveNewProject: any;
  public status!: string;
  public filesToUpload!: Array<File>;

  constructor(
    private _projectService: ProjectService,
    private _uploadService: UploadServices,
    private _router: Router,
    private _route: ActivatedRoute

    ) {

      this.title = "Editar Proyecto";
      this.project = new Project('','','','','', 2022,'');
    }

    ngOnInit(): void {
      this._route.params.subscribe(params => {
        let id = params['id'];
  
        this.getProject(id);
      });
    }
  
    getProject(id: any){
      this._projectService.getProject(id).subscribe(
        response => {
          this.project = response.project;
        }, 
        error => {
          console.log(<any>error);
        }
      );
    }

    onSubmit(form: any) {

      this._projectService.updateProject(this.project).subscribe(
        response => {
          if(response.project) {
            
            if(this.filesToUpload){

              // Subir imagen
              this._uploadService.makeFileRequest(Global.url + 'upload-image/' + response.project._id, [], this.filesToUpload, 'image')
                .then((result: any) => {
    
                this.saveNewProject = result.project;
    
                this.status = 'success';
                form.reset();
              });
            } else {
              this.saveNewProject = response.project;
              this.status = 'success';
            }

          } else {
            this.status = 'failed';
          }
        }, error => { console.log(<any>error); }
      );
    }
  
    fileChangeEvent(fileInput: any) {
      this.filesToUpload = <Array<File>>fileInput.target.files;
    }

}
