FROM python:3.9-alpine

RUN mkdir /server
WORKDIR /server

COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

COPY gunicorn_config.py gunicorn_config.py
COPY entrypoint.sh entrypoint.sh
RUN chmod +x ./entrypoint.sh

ADD app app

EXPOSE 5000

CMD [ "sh", "entrypoint.sh" ]
