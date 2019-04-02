$(document).ready(function(){
    $('.delete-product').click(function(e){
        $target = $(e.target);
        //const id = $(e).attr("data-id");
        const id = $('#blabla').attr('data-id');
        const temp = $('#blabla').attr('teemp');
        //console.log(id);
        $.ajax({
            type:'DELETE',
            url: '/products/'+id,
            success: function(response){
            alert('Deleting product ' + id);
            window.location.href='/';
            },
            error: function(err){
            console.log(err);
            }
        });
    });
});