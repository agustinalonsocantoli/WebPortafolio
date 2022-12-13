'use strict'

let Project = require('../models/project');
let fs = require('fs');
let path = require('path');

let controller = {

    saveProject: function(req, res) {
        let project = new Project();

        let params = req.body;
        project.name = params.name;
        project.description = params.description;
        project.category = params.category;
        project.langs = params.langs;
        project.year = params.year;
        project.image = null;

        project.save((error, projectStored) => {
            if(error) return res.status(500).send({message: 'Error al guardar.'});
            if(!projectStored) return res.status(404).send({message: 'No se ha podido guardar.'});
            
            return res.status(200).send({project: projectStored});
        });
    },

    getProject: function(req, res) {
        let projectId = req.params.id;

        if(projectId == null) return res.status(404).send({message: 'El documento no existe'});
        
        Project.findById(projectId, (error, project) => {
            if(error) return res.status(500).send({message: 'Error al obtener datos'});
            if(!project) return res.status(404).send({message: 'El documento no existe'});

            return res.status(200).send({project});
        });
    },

    getProjects: function(req, res) {

        Project.find({}, (error, projects) => {
            if(error) return res.status(500).send({message: 'Error al obtener datos'});
            if(!projects) return res.status(404).send({message: 'No hay proyectos para mostrar'});

            return res.status(200).send({projects});
        });
    },

    uptadeProject: function(req, res) {
        let projectId = req.params.id;
        let update = req.body;

        Project.findByIdAndUpdate(projectId, update, {new: true}, (error, projectUpdated) => {
            
            if(error) return res.status(500).send({message: 'Error al actualizar'});
            if(!projectUpdated) return res.status(404).send({message: 'No existe el proyecto'});

            return res.status(200).send({
                project: projectUpdated
            });
        });
    },

    deleteProject: function(req, res) {
        let projectId = req.params.id;

        Project.findByIdAndRemove(projectId, (error, projectRemoved) => {

            if(error) return res.status(500).send({message: 'No se ha podido borrar el proyecto'});
            if(!projectRemoved) return res.status(404).send({message: 'No se puede eliminar'});

            return res.status(200).send({
                project: projectRemoved
            });
        });
    },

    uploadImage: function(req, res) {
        let projectId = req.params.id;

        if(req.files){
            let filePath = req.files.image.path;
            let fileSplit = filePath.split('/');
            let fileName = fileSplit[1];
            let extSplit = fileName.split('.');
            let fileExt = extSplit[1];

            if(fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg' || fileExt == 'gif') {

                Project.findByIdAndUpdate(projectId, {image: fileName}, {new: true}, (error, projectUpdated) => {

                    if(error) return res.status(500).send({message: 'La imagen no se ha cargado'});
                    if(!projectUpdated) return res.status(404).send({message: 'El proyecto no existe para cargar imagen'});
    
    
                    return res.status(200).send({
                        project: projectUpdated
                    });
                });
            } else {

                fs.unlink(filePath, (err) => {
                  return res.status(200).send({message: "la extension no es valida"});
                });
            };
        }
    },

    getImageFile: function(req, res) {
        let file = req.params.image;
        let pathFile = './uploads/' + file;

        fs.access(pathFile, fs.constants.F_OK, (error) => {
            if(error) {
                return res.status(200).send({message: 'La imagen no existe'});
            } else {
                return res.sendFile(path.resolve(pathFile));
            }
        });
    }

};

module.exports = controller; 