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


router.post("/addchar", function(req, res)
{
	var db = req.db;
	var collection = charcoll;


	var author = req.body.author;
	var charName = req.body.name;
	var formes = req.body.formes;
	var abilities = req.body.abilities;
	var desc = req.body.description;

	var newChar = collection(
	{
		author: author,
		character:
		{
			name: charName,
			formes: [formes],
			abilities: [abilities],
			description: desc

		}
	});

	console.log(newChar);

	newChar.save(function(err)
	{
		res.send(
			(err == null) ? {msg: ""} : {msg: err});
	});



});


module.exports = router;
