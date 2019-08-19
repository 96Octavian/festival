'use strict';

var utils = require('../utils/writer.js');
var Performer = require('../service/PerformerService');

module.exports.getPerformerByEvent = function getPerformerByEvent (req, res, next) {
  var eventID = req.swagger.params['eventID'].value;
  Performer.getPerformerByEvent(eventID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getPerformerByCompany = function getPerformerByCompany( req, res, next ) {
	var companyID = req.swagger.params['companyID'].value;
	Performer.getPerformerByCompany( companyID )
		.then( function ( response ) {
			utils.writeJson( res, response );
		} )
		.catch( function ( response ) {
			utils.writeJson( res, response );
		} );
};

module.exports.getPerformerByArtist = function getPerformerByArtist( req, res, next ) {
	var artistID = req.swagger.params['artistID'].value;
	Performer.getPerformerByArtist( artistID )
		.then( function ( response ) {
			utils.writeJson( res, response );
		} )
		.catch( function ( response ) {
			utils.writeJson( res, response );
		} );
};


module.exports.getPerformerById = function getPerformerById (req, res, next) {
  var performerID = req.swagger.params['performerID'].value;
  Performer.getPerformerById(performerID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getPerformers = function getPerformers (req, res, next) {
  var offset = req.swagger.params['offset'].value;
  var limit = req.swagger.params['limit'].value;
  Performer.getPerformers(offset,limit)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
