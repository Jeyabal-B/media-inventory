function bookSearch(){
    var search = document.getElementById('bookSearchText').value 
    document.getElementById('bookSearchResults').innerHTML = ""
    //console.log(search)
    $.ajax({
        url: "https://www.googleapis.com/books/v1/volumes?q=" + search,
        dataType:"json",
        success: function(data){
            //console.log(data)
            for(i=0; i< data.items.length; i++){
                bookSearchResults.innerHTML += "<h3>" + data.items[i].volumeInfo.title +"</h3>"
            }
        },
        type: 'GET',
    })
}

document.getElementById('bookSearchButton').addEventListener('click',bookSearch,false)