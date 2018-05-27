$(document).ready(function() {

	var rootDiv = $('#root');
	refreshBook(rootDiv);
	handleForm();

	rootDiv.on('click', '.book', function(){
		console.log($(this).data("id"));
		var bookDiv = $(this);
		var detailDiv = bookDiv.find('div');
		var bookId = $(this).data('id');

		$.ajax({
			url: "http://localhost:8282/books/" + bookId,
			type: "GET"
		}).done(function(bookDetails){
			detailDiv.toggle();
			detailDiv.text("Author: " + bookDetails.author + ", ID " + bookDetails.id + ", ISBN " + bookDetails.isbn + ", publisher " + bookDetails.publisher + ", type " + bookDetails.type);

		});
	})

});

function handleForm(){
	var form = $('.new_book');
	var submitButton = form.find('#add-button');
	submitButton.on('click', function(event){
		event.preventDefault();
		alert('Dodałeś książkę');

		var author = $('#author').val();
		var isbn = $('#isbn').val();
		var publisher = $('#publisher').val();
		var title = $('#title').val();
		var type = $('#type').val();
	});
}



function refreshBook(rootElement){
	rootElement.html("");
	$.ajax({
		url: "http://localhost:8282/books"
	}).done(function(data){

	
		for(var i=0; i < data.length; i++){
			var bookElement = $("<div class='book' data-id='" + data[i].id + "'>" + data[i].title + "<div style='display: none; background-color: grey;'></div></div>");
			rootElement.append(bookElement);
		}

	})
}

	// author
	// id
	// isbn
	// publisher
	// title
	// type