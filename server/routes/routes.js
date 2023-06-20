const express = require('express');
const router = express.Router();
const dataController = require('../controllers/dataControllers');
 
router.get('/',dataController.getAllData);
router.get('/end-year/:year',dataController.getEndYearByYear);
router.get('/start-year/:year',dataController.getStartYearByYear);
router.get('/year',dataController.getAllYears);
router.get('/property',dataController.getAllProperty);
 
router.get('/sector',dataController.getAllSector);
router.get('/sector/:name',dataController.getSectorByName);

router.get('/region',dataController.getAllRegion);
router.get('/region/:name',dataController.getRegionByName);

router.get('/source',dataController.getAllSource);
router.get('/source/:name',dataController.getSourceByName);
router.get('/topic',dataController.getAllTopics);
router.get('/topic/:name',dataController.getTopicByName);

router.get('/pestle',dataController.getAllPestel);
router.get('/pestle/:name',dataController.getPestelByName); 


router.get('/country',dataController.getAllCountry);
router.get('/country/:name',dataController.getCountryByName);



module.exports = router;