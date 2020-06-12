let show_modal = (e) => {
    let row = e.currentTarget;
    $('.modal-title').text(row.id);
    let name = row.id.toLowerCase().replace(/ /g, '_');
    $('#map_img').attr('src', `../static/images/maps/${name}.png`);
    fetch(`/map-stats/${row.id}`).then(r => {
        r.json().then(d => {
            $('#gp').text('Global Plays: '.concat(d['gp'].toLocaleString()));
            $('#ghs').text('Global High Score: '.concat(d['ghs'].toLocaleString()));
            $('#up').text('Your Plays: '.concat(d['up'].toLocaleString()));
            $('#uhs').text('Your High Score: '.concat(d['uhs'].toLocaleString()));
            $('.modal').modal('show');
        })
    });
}

$('.map_row').click(show_modal);