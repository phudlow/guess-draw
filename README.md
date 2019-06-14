## Guess Draw

# MVP
1. Choose a nickname at the welcome screen
2. Join or create a game.
3. In the game lobby wait for the creator to start the game.  If you are the creator, block spots if desired, then start game when desired.
- Get a list of easy, hard, medium words on the backend.
4. Randomly determine who will go first, then go to the right.
5. Show the word to the drawer. Remind them the sketch cannot contain letters or numbers.
6. Declare that a person is starting.
7. Count down to the game starting.
8. Game begins, and a count down in the corner starts (30s 60s?).  Guessers type guesses and press enter while the drawer draws.
9. First person to submit a string containing the correct answer is the winner automatically.  The drawer and the guesser gets a point.
10. Annouce the winner, followed by the next drawer.
11. Also annouce when a new round starts.
12. Once rounds are over show results screen.
    - List of players in order of how many points earned.

# Possible future features
1. Savable data about the game to laugh about later
2. Expand words list
3. Lobby chat
4. Expand game options (word types, number of rounds)

# Todo:
1. Refactor server emit events
    - The server should only emit
        1. meta data for all games for those in gamesbrowser
        2. specific game data to those in that game
        3. game play related events (new draw data, guesses, win events, player change events)
    - Trim down actions and reducers as a result
2. Testing
    - Organize per view
    - Use jest with puppeteer
    - For Welcome, Games Browser, and Games Lobby can test functionality through app interaction from start.
    - For Game, can first verify that
3. Refactor strings to constants file