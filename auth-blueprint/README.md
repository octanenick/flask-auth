export FLASK_APP=run.py
flask db init
flask db migrate
flask db upgrade


flask db init: This command will initialize the migration script directory. This directory contains a collection of scripts (also known as revisions) which are used to track changes in the schema of your database. This command only needs to be run once, when you're setting up your application.

flask db migrate: This command will generate a new migration script (or revision) based on the changes it detects in your models compared to the current state of your database schema. This does not modify your database, it just generates the script that can do so.

flask db upgrade: This command will apply any pending migration scripts to your database, thus bringing the schema of your database in line with the changes in your models. It's this command that will actually modify your database.
