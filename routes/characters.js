var express = require('express');
var router = express.Router();

var mongoose = require("mongoose");

var charSchema = mongoose.Schema(
{
	author: String,
	character:
	{
		name: String,
		formes: [String],
		abilities: [String],
		description: String

	}
});

var charcoll = mongoose.model("charcoll", charSchema, "characters");

router.get("/characterlist", function(req, res)
{
	var db = req.db;
	var collection = charcoll;
	collection.find({}, {}, function(err, docs)
	{
		res.json(docs);
	})
})


module.exports = router;
