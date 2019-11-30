//Acá Primero ocultamos el btn de los comentarios para luego mostrarlo con el método slideToggle().
$('#post-comment').hide();
$('#btn-toggle-comment').click(e => {
    e.preventDefault();
    $('#post-comment').slideToggle();
})

//Hacemos este Js con Jqeury desde el cliente porque contabilizamos el (e) de click sobre el BTN de like. O sea cada vez que desde el lado del cliente tengamo un like, nosotros contabilizamos (y lo guardamos en la base de datos) para luego mostrarlo en la vista. 

//Con Jqeury selecionamos el btn
$('#btn-like').click(function(e) {
    //Con el (e).preventDefault(); cancelamos el btn.
    e.preventDefault();
    let imgId =  $(this).data('id');
    console.log(imgId);

    //Petición de datos a la ruta que tenemos en routes. 
    $.post('/images/' + imgId + '/like')
    .done(data => {
        console.table(data);
        $('.likes-count').text(data.likes)
    });
});


//Delete La imagen subida. Vamos a hacer una peticiñon Ajax para hacerlo. 
$('#btn-delete').click(function(e){
    e.preventDefault();
    //Ahora vamos a tomar el btn con this.
    let $this = $(this);
    //confirm() devuelve un valor boleano a partir de ahí vamos a validar la acción.
    const response = confirm('Estas seguro que queres borrar este post?');

    if (response){
            let imgId = $this.data('id');
            //console.log(imgId);

            //Hacemos Petición pero es $.ajax porque no es una ruta POST sino DELETE.
            $.ajax({
                    url:'/images/' + imgId,
                    type: 'DELETE',
            })

            .done(function (result) {
                    
                    $this.find('i').removeClass('fa-times').addClass('fa-check');
                    //Cambiamos el String del BTN.
                    let cambioString = $('#btn-delete').text().replace(/Borrar/, 'BORRADO');
                    $('#btn-delete').text(cambioString);
                    setTimeout(() => {
                        window.location.pathname = '/'
                    }, 1000)
            
            });

    }

});

