#!/bin/bash
exec gunicorn --config /server/gunicorn_config.py app.wsgi:app
