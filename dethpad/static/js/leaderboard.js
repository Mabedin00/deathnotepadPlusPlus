let show_modal = (e) => {
    let row = e.currentTarget;
    $('.modal-title').text(row.id)
    $('.modal').modal('show');
}

$('.map_row').click(show_modal)