var express = require('express');
var router = express.Router();

// Require controller modules.
var menu_controller = require('../controllers/menu_controller');


// GET request for creating menu. NOTE This must come before route for id (i.e. display menu).
router.get('/menu/create', menu_controller.menu_create_get);

// POST request for creating menu.
router.post('/menu/create', menu_controller.menu_create_post);

// GET request to delete menu.
router.get('/menu/:id/delete', menu_controller.menu_delete_get);

// POST request to delete menu.
router.post('/menu/:id/delete', menu_controller.menu_delete_post);

// GET request to update menu.
router.get('/menu/:id/update', menu_controller.menu_update_get);

// POST request to update menu.
router.post('/menu/:id/update', menu_controller.menu_update_post);

// GET request for one menu.
router.get('/menu/:id', menu_controller.menu_detail);

// GET request for list of all menus.
router.get('/menus', menu_controller.menu_list);

module.exports = router;