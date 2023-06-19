def serialize_period(period_data):
    return {
        'periodType': period_data['periodType'],
        'num': period_data['num'],
        'ordinalNum': period_data['ordinalNum'],
        'goals': {
            'home': period_data['home']['goals'],
            'away': period_data['away']['goals'],
        }
    }

# game is a dict
def serialize_game_summary(game_data):
    linescore = game_data['linescore']
    return {
        'nhlId': game_data['gamePk'],
        'gameDate': game_data['gameDate'],
        'stateCode': game_data['status']['codedGameState'],
        'currentPeriod': linescore['currentPeriod'],
        'currentPeriodTimeRemaining': linescore['currentPeriodTimeRemaining'],
        'currentPeriodOrdinal': linescore['currentPeriodOrdinal'],
        # see if this works better here, undecided
        'score': {
            'away': linescore['teams']['away']['goals'],
            'home': linescore['teams']['home']['goals'],
        },
        'teams': {
            'away': {
                'name': game_data['teams']['away']['team']['name'],
                'nhlId': game_data['teams']['away']['team']['id'],
                'score': linescore['teams']['away']['goals']
            },
            'home': {
                'name': game_data['teams']['home']['team']['name'],
                'nhlId': game_data['teams']['home']['team']['id'],
                'score': linescore['teams']['home']['goals']
            },
        },
        'linescore': {
            'periods': [serialize_period(period) for period in linescore['periods']]
        },
        'venue': {
            'name': game_data['venue']['name'],
            'nhlId': game_data['venue']['id'],
        },

    }

def serialize_game(game_data):
    return game_data # temporarily just send back the JSON snapshot

def serialize_schedule(schedule_data):
    return {
        'totalGames': schedule_data['totalGames'],
        'games': [serialize_game_summary(game) for date in schedule_data['dates'] for game in date['games']],
    }
