import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/services/projetc.services';
import { Global } from 'src/app/services/global';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
  providers: [ProjectService]
})
export class DetailComponent implements OnInit {
  public url: string;
  public project!: Project;
  public confirm: boolean;

  constructor(
    private _projectService: ProjectService,
    private _router: Router,
    private _route: ActivatedRoute

    ) {

    this.url = Global.url;
    this.confirm = false;
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

  deleteProject(id: any) {
    this._projectService.deleteProject(id).subscribe(
      response => {
        if(response.project) {
          this._router.navigate(['/proyectos']);
        }
      }, 
      error => {
        console.log(<any>error);
      }
    );
  }

  deleteConfirm() {
    this.confirm = true;
  }

  deleteCancel() {
    this.confirm = false;
  }

}
