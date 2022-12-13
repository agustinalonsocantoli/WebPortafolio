import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/services/projetc.services';
import { UploadServices } from 'src/app/services/upload.services';
import { Global } from 'src/app/services/global';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [ProjectService, UploadServices]
})
export class CreateComponent implements OnInit {
  public title: string;
  public project: Project;
  public saveNewProject: any;
  public status!: string;
  public filesToUpload!: Array<File>;

  constructor(
    private _projectService: ProjectService,
    private _uploadService: UploadServices

    ) {

    this.title = "Crear Proyecto";
    this.project = new Project('','','','','', 2022,'');
  }

  ngOnInit(): void {
  }

  onSubmit(form: any) {

    this._projectService.saveProject(this.project).subscribe(
      response => {
        if(response.project) {

          // Subir imagen
          this._uploadService.makeFileRequest(Global.url + 'upload-image/' + response.project._id, [], this.filesToUpload, 'image')
          .then((result: any) => {

            this.saveNewProject = result.project;

            this.status = 'success';
            form.reset();
          });

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
