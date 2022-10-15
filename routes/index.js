const express = require('express');
const app = express();
const homeController=require('../controllers/homeController');
const router=express.Router();

router.get('/',homeController.home);

router.get('/sign-in',homeController.signin);
router.get('/sign-up',homeController.signup);

router.post('/create',homeController.create);
router.get('/create-session',homeController.createSession);

module.exports=router;