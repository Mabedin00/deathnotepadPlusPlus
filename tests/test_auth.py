from flask import session


def test_registration(client):
    assert client.get('/register').status_code == 200

    response = client.post('/register',
                           data={'username': 'testing', 'password': 'password', 'repeat': 'password'},
                           follow_redirects=True)
    assert b'Account created!' in response.data


def test_registration_validation(client):
    response = client.post('/register',
                           data={'username': 'test', 'password': 'password', 'repeat': 'password'},
                           follow_redirects=True)
    assert b'Username taken!' in response.data

    response = client.post('/register',
                           data={'username': 'testing', 'password': 'a', 'repeat': 'a'},
                           follow_redirects=True)
    assert b'Account creation failed!' in response.data

    response = client.post('/register',
                           data={'username': 'testing', 'password': 'password', 'repeat': 'a'},
                           follow_redirects=True)
    assert b'Account creation failed!' in response.data


def test_login(client):
    assert client.get('/login').status_code == 200

    response = client.post('/login',
                           data={'username': 'test', 'password': 'password'},
                           follow_redirects=True)
    assert b'Logged in successfully!' in response.data


def test_login_validation(client):
    response = client.post('/login',
                           data={'username': 'al;ksdjfs;adlkjf;sladkjfl;sd;jf', 'password': 'password'},
                           follow_redirects=True)
    assert b'Username does not exist!' in response.data

    response = client.post('/login',
                           data={'username': 'test', 'password': 'passwords'},
                           follow_redirects=True)
    assert b'Incorrect password!' in response.data

    response = client.post('/login',
                           data={'username': 'test', 'password': 'pass'},
                           follow_redirects=True)
    assert b'Authentication failed!' in response.data


def test_logout(client):
    client.post('/login', data={'username': 'test', 'password': 'password'})
    with client:
        client.get('/logout')
        assert 'user_id' not in session