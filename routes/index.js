const express = require('express');
const passport = require('passport');
const app = express();
const homeController=require('../controllers/homeController');
const router=express.Router();

router.get('/',passport.checkAuthentication,homeController.home);

router.get('/sign-in',homeController.signin);
router.get('/sign-up',homeController.signup);
router.get('/sign-out',homeController.destroySession);


router.post('/create',homeController.create);
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'/emp-sign-in'},
),homeController.createSession);

module.exports=router;