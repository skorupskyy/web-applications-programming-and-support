$(document).ready(function(){
    $('.delete-product').click(function(e){
        $target = $(e.target);
        const id = $(e.target).attr("data-id");
        var temp = $(e.target).prop("teemp");
        //bug
        console.log($(e.target).prop("teemp"));
        $.ajax({
            type:'DELETE',
            url: '/product/'+id,
            success: function(response){
            alert('Deleting product' + temp);
            window.location.href='/';
            },
            error: function(err){
            console.log(err);
            }
        });
    });
});