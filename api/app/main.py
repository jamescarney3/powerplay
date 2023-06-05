import os
from flask import Flask, render_template
from flask_cors import CORS
from flask_socketio import SocketIO, emit

import app.configs as configs


app = Flask(__name__)
app_configs = {
    'cors_allowed_origins': [configs.client_origin],
    'port': configs.port,
}
socketio = SocketIO(app, **app_configs)

@socketio.on('ping')
def handle_ping():
    socketio.emit('pong', { 'data': 'pong' })


if __name__ == '__main__':
    socketio.run(app)
