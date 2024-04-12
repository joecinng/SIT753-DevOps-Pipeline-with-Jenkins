const addCards = (items) => { 
    items.forEach(item => {
        let itemToAppend = 
            '<div class="col s4">'+
            '<div class="card small"><div class="card-image waves-effect waves-block waves-light"><img class="activator" src="'+item.path+'">'+
            '</div><div class="card-content">'+
            '<span class="card-title activator grey-text text-darken-4">'+item.title+'<i class="material-icons right">more_vert</i></span><p><a href="#">'+item.color+'</a></p></div>'+ '<div class="card-reveal">'+
            '<span class="card-title grey-text text-darken-4">'+item.title+'<i class="material-icons right">close</i></span>'+ '<p class="card-text grey-text">'+item.description+'</p>'+
            '</div></div></div>';
        $("#card-section").append(itemToAppend);
    })
};

const postcards = (formData) => {
    // make a request to store the cat data
    $.post('/api/cats', formData, async (response) => {
        if (response.statusCode == 201) {
            console.log('Cat added successfully:', response.data);
            await alert('Cat added successfully');
        } else {
            console.error('Error adding cat:', response.message);
            await alert('Error adding cat');
        }
    });
}

const getcards = () => {
    // make a request to the server to get the cats data
    $.get('/api/cats',(response) => {
        if (response.statusCode==200){
            // display the cats as the cards
            addCards(response.data);
        }
    })
}

const submitForm = () => {
    let formData = {};
    formData.title = $('#title').val();
    formData.color = $('#color').val();
    formData.path = $('#path').val();
    formData.description = $('#description').val();

    postcards(formData);
}

$(document).ready(function() {
    $('.materialboxed-image').materialbox();
    $('#formSubmit').click(()=>{ 
        submitForm();
    })
    getcards();
    $('.modal').modal();
});