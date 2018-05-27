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
			detailDiv.text("Author: " + bookDetails.author + ", ID: " + bookDetails.id + ", ISBN: " + bookDetails.isbn + ", publisher: " + bookDetails.publisher + ", type: " + bookDetails.type);

		});
	})

});

function handleForm(){
	var form = $('.new_book');
	var submitButton = form.find('#add-button');
	submitButton.on('click', function(event){
		event.preventDefault();

		var newBook= {};

		newBook.author = $('#author').val();
		newBook.isbn = $('#isbn').val();
		newBook.publisher = $('#publisher').val();
		newBook.title = $('#title').val();
		newBook.type = $('#type').val();

		$.ajax({
			url: "http://localhost:8282/books",
			type: "POST",
			headers: {
				'Accept': 'application/json',
				"Content-Type": "application/json"
			},
			data: JSON.stringify(newBook)
		}).done(function(){
			refreshBook($('#root'))
		})
	});
}

function refreshBook(rootElement){
	rootElement.html("");
	$.ajax({
		url: "http://localhost:8282/books"
	}).done(function(data){

	
		for(var i=0; i < data.length; i++){
			var bookElement = $("<div class='book' data-id='" + data[i].id + "'>" + data[i].title + "<div style='display: none; background-color: azure;'></div></div>");
			rootElement.append(bookElement);
		}

	})
}