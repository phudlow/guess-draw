## Guess Draw

# TODO
- Convert to react components to with scss in js (in separate file, don't put things in the file that are app level)
    - Game
        - Player
    - Game lobby
        - Games list (with create button)
        - Game options
        - Chat (with # current connected)
    - Welcome screen
- Look into transmitting image data rather than draw instructions from drawing client   
- Implement redux 
    - Maybe, "local state is fine" https://medium.com/@dan_abramov/you-might-not-need-redux-be46360cf367
    - Need a way to link socket to component state, redux might be best for reducers, just try it out