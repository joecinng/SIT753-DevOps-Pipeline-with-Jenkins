const cardList = [
    {
        title: "Kitten 1",
        image: "images/cat-1.png", 
        link: "About Kitten 1",
        desciption: "Demo desciption about kitten 1"
    },
    {
        title: "Kitten 2",
        image: "images/cat-2.png", 
        link: "About Kitten 2",
        desciption: "Demo desciption about kitten 2"
    },
    {
        title: "Kitten 3",
        image: "images/cat-3.png", 
        link: "About Kitten 3",
        desciption: "Demo desciption about kitten 3"
    }
];

const addCards = (items) => { 
    items.forEach(item => {
        let itemToAppend = 
            '<div class="col s4">'+
            '<div class="card small"><div class="card-image waves-effect waves-block waves-light"><img class="activator" src="'+item.image+'">'+
            '</div><div class="card-content">'+
            '<span class="card-title activator grey-text text-darken-4">'+item.title+'<i class="material-icons right">more_vert</i></span><p><a href="#">'+item.link+'</a></p></div>'+ '<div class="card-reveal">'+
            '<span class="card-title grey-text text-darken-4">'+item.title+'<i class="material-icons right">close</i></span>'+ '<p class="card-text grey-text">'+item.desciption+'</p>'+
            '</div></div></div>';
        $("#card-section").append(itemToAppend);
    })
};

const submitForm = () => {
    let formData = {};
    formData.firstName = $('#first_name').val();
    formData.lastName = $('#last_name').val();
    formData.password = $('#password').val();
    formData.email = $('#email').val();
    console.log("form submitted ", formData);
}

$(document).ready(function() {
    $('.materialboxed-image').materialbox();
    addCards(cardList);
    $('#formSubmit').click(()=>{ 
        submitForm();
    })
    $('.modal').modal();
});