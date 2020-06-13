def test_leaderboard(client):
    request = client.get('/leaderboard')
    assert request.status_code == 200
    assert b'You are not logged in!' in request.data

    client.post('/login', data={'username': 'bro', 'password': 'brbrbrbr'})
    request = client.get('/leaderboard')
    assert b'You are not logged in!' not in request.data


def test_high_score(client):
    client.post('/login', data={'username': 'bro', 'password': 'brbrbrbr'})
    client.post('/score', json={'score': 999990, 'map': 'ocean_road', 'id': 1})
    assert b'999,990' in client.get('/leaderboard').data

    client.post('/score', json={'score': 999999, 'map': 'ocean_road', 'id': 1})
    assert b'999,999' in client.get('/leaderboard').data

    client.post('/score', json={'score': 999998, 'map': 'ocean_road', 'id': 1})
    assert b'999,998' not in client.get('/leaderboard').data


def test_highest_score(client):
    client.post('/score', json={'score': 999999, 'map': 'ocean_road', 'id': 1})
    assert b'999,999' in client.get('/leaderboard').data