'use strict'

let express = require('express');
let projectController = require('../controllers/project');

let router = express.Router();

let multipart = require('connect-multiparty');
let multipartMiddlewate = multipart({uploadDir: './uploads'});

router.post('/save-project', projectController.saveProject);
router.get('/project/:id?', projectController.getProject);
router.get('/projects', projectController.getProjects);
router.put('/project/:id', projectController.uptadeProject);
router.delete('/project/:id', projectController.deleteProject);
router.post('/upload-image/:id', multipartMiddlewate, projectController.uploadImage);
router.get('/get-image/:image', projectController.getImageFile);

module.exports = router;