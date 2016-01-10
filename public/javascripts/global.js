// Charlist data array for filling in info box
var charListData = [];

// DOM Ready =============================================================
$(document).ready(function() {

    // Populate the user table on initial page load
    populateTable();
    $('#charList table tbody').on('click', 'td a.linkshowchar', showCharInfo);

});

// Functions =============================================================

// Fill table with data
function populateTable() {

    // Empty content string
    var tableContent = '';

    // jQuery AJAX call for JSON
    $.getJSON( '/characters/characterlist', function( data ) {

        charListData = data;

        // For each item in our JSON, add a table row and cells to the content string
        $.each(data, function(){
            tableContent += '<tr>';
            tableContent += '<td>' + this.author + '</td>';
            tableContent += '<td><a href="#" class="linkshowchar" rel="' + this.character.name + '">' + this.character.name + '</a></td>';
            tableContent += '<td><a href="#" class="linkdeletechar" rel="' + this._id + '">delete</a></td>';
            tableContent += '</tr>';
        });

        // Inject the whole content string into our existing HTML table
        $('#charList table tbody').html(tableContent);
    });
};

// Show Char Info
function showCharInfo(event) {


    // Prevent Link from Firing
    event.preventDefault();

    // Retrieve username from link rel attribute
    var thisCharName = $(this).attr('rel');

    // Get Index of object based on id value
    var arrayPosition = charListData.map(function(arrayItem) 
        { 
            return arrayItem.character.name; 
        }).indexOf(thisCharName);

   

    var thisCharObject = charListData[arrayPosition];
    //alert(thisCharObject.character.formes);
    //Populate Info Box
    $('#charInfoName').text(thisCharObject.character.name);
    $('#charInfoFormes').text(thisCharObject.character.formes);
    $('#charInfoAb').text(thisCharObject.character.abilities);
    $('#charInfoDesc').text(thisCharObject.character.description);

};