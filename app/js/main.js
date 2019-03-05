$( document ).ready(function() {
    $( function() {
      $( "#sortable" ).sortable({revert: true});
    });
    function deleteBlock(){
      $('.item-btn__delete').click(function(){
        $(this).next('.list-item__delete').addClass('open');
      });
      $('.delete-block__button_no').click(function(){
        $(this).parents('.list-item__delete').removeClass('open');
      });
      $('.delete-block__button_yes').click(function(){
        $(this).parents('.list-item').remove();
      });
    }
    deleteBlock();

    Dropzone.autoDiscover = false;
    $("#dropzone-upload").dropzone({
      url: "#",
      addRemoveLinks: true,
      success: function (file, response) {
        console.log('success')
      },
      error: function (file, response) {
        console.log('error');
        var lastBlock = $('.main-block__sort .list-item:last-child'),
            count = "list" + $('.list-item').length + 1;
        lastBlock.clone().addClass('upload').appendTo('.main-block__sort');
        $('.upload').find('.item-btn__edit').attr('for', count);
        $('.upload').find('.list-item__title').attr('id', count).val($('.list-item').length + '. New file');
        setTimeout(function() {
          $('.upload').removeClass('upload');
          deleteBlock();
        }, 3000);
      }
    });
});
