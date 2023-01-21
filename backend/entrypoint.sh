./manage.py reset_db --noinput
./manage.py makemigrations
./manage.py migrate
./manage.py seed
./manage.py search_index --rebuild -f
./manage.py collectstatic --noinput

gunicorn --chdir server --bind :8000 server.wsgi:application
