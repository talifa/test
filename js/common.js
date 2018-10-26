function closeSelect(selectMenu, listItems) {
    $(selectMenu).removeClass('active');
    TweenMax.staggerTo(listItems, 0.12, { y: -20, opacity: 0, onComplete: function() { listItems.css("display", "none"); } }, -0.05);
}

function openSelect(selectMenu, listItems) {
    $(selectMenu).addClass('active');
    listItems.css("display", "block");
    TweenMax.staggerFromTo(listItems, 0.12, { opacity: 0, y: -20, ease: Back.easeOut }, { opacity: 1, y: 0 }, 0.05);
}

$('select').each(function() {
    var $this = $(this),
        numOptions = $this.children('option').length;

    $this.addClass('select-hidden');
    $this.wrap('<div class="select"></div>');
    $this.after('<div class="select-styled"></div>');

    var $styledSelect = $this.next('div.select-styled');
    $styledSelect.text($this.children('option').eq(0).text());

    //Create List
    var $list = $('<ul />', {
        'class': 'select-options'
    }).insertAfter($styledSelect);

    //Populate List
    for (var i = 1; i < numOptions; i++) {
        $('<li />', {
            text: $this.children('option').eq(i).text(),
            rel: $this.children('option').eq(i).val()
        }).appendTo($list);
    }

    var $listItems = $list.children('li');

    closeSelect($('.select-styled'), $listItems);

    $styledSelect.click(function(e) {
        e.stopPropagation();
        if ($(this).hasClass('active')) {
            closeSelect(this, $listItems);
        } else {
            openSelect(this, $listItems);
        }
    });

    $listItems.click(function(e) {
        e.stopPropagation();
        $styledSelect.text($(this).text()).removeClass('active');
        $this.val($(this).attr('rel'));
        closeSelect($('.select-styled'), $listItems);
    });

    $(document).click(function() {
        closeSelect($('.select-styled'), $listItems);
    });

});

$('.cell_mobile .delete_btn').click(function() {
    $(this).parent().parent().parent().css({
        display: 'none',

    });
});
$('.cell .delete_btn').click(function() {
    $(this).parent().parent().css({
        display: 'none',


    });
});
