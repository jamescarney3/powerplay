import os
import requests
import threading
from datetime import datetime, timedelta
from time import sleep
from flask import Flask, render_template, request
from flask_cors import CORS
from flask_socketio import SocketIO, emit

import app.configs as configs
import app.serializers as serializers


app = Flask(__name__)
CORS(app, resources={'/api/*': {'origins': configs.client_origin}})
app_configs = {
    'cors_allowed_origins': [configs.client_origin],
    'port': configs.port,
}
socketio = SocketIO(app, **app_configs)

workers = dict()
worker_stop_signals = dict()
heartbeats = dict()


# background tasks
def fetch_game_data(game_id, stop):
    while True:
        if game_id in heartbeats:
            last_heartbeat = heartbeats[game_id]
            delta = datetime.today() - heartbeats[game_id]
            if delta.seconds >  120:
                worker_stop_signals[game_id] = True
                del heartbeats[game_id]

        game_res = requests.get('https://statsapi.web.nhl.com/api/v1/game/' + str(game_id) + '/feed/live')
        socketio.emit('update-live-feed', game_res.json(), namespace='/live-feed')

        sleep(15)
        if stop():
            break


# socket resources
@socketio.on('ping')
def handle_ping():
    socketio.emit('pong', { 'data': 'pong' })

@socketio.on('connect-live-feed', namespace='/live-feed')
def handle_connect_feed(message):
    game_id = message['gameId']
    if game_id not in workers:
        worker_stop_signals[game_id] = False
        workers[game_id] = threading.Thread(
            target=fetch_game_data,
            args=(game_id, lambda: worker_stop_signals[game_id]))
        workers[game_id].start()

@socketio.on('live-feed-heartbeat', namespace='/live-feed')
def handle_live_feed_heartbeat(message):
    game_id = message['gameId']
    d = datetime.today()
    heartbeats[game_id] = d


# data api resources
@app.route('/api/schedule')
def handle_schedule():
    schedule_res = requests.get('https://statsapi.web.nhl.com/api/v1/schedule?expand=schedule.linescore&date=2023-06-05')
    schedule_json = schedule_res.json()
    return serializers.serialize_schedule(schedule_json)

@app.route('/api/game-live/<id>')
def handle_game_live(id):
    game_res = requests.get('https://statsapi.web.nhl.com/api/v1/game/' + str(id) + '/feed/live')
    return game_res.json()

if __name__ == '__main__':
    socketio.run(app)
