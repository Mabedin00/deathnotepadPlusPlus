import os
import tempfile
import shutil

import pytest

from dethpad import app, db


@pytest.fixture
def application():
    db_fd, temp_path = tempfile.mkstemp('.db')
    shutil.copy2('./dethpad/static/data/database.db', temp_path)
    app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{temp_path}'
    app.config['TESTING'] = True
    app.config['WTF_CSRF_ENABLED'] = False

    with app.app_context():
        db.create_all()
    yield app

    os.close(db_fd)


@pytest.fixture
def client(application):
    return application.test_client()