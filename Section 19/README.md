# Section 19
## Objectives
Colt is going to talk to us about some "events" methods as he describes them. The events that he is going to discuss are:
* click()
* keypress()
* on()


## click()
Essentially this is jQuery shorthand for adding a click listener to an HTML element.

## keypress()
Keypress allows you to trigger a function when a key is pressed (easy). The result is a javascript object that contains within it the final result of the key press. So, if a user hits shift and a then the result is a capital 'A'.  It is different from keydown() and keyup() in that those fire for every single key touch event rather than providing a 'final result.'

## on()
On works almost identical to addEventListener(). It lets you specify the kind of listener you want as opposed to click() and keypress() being specific to one kind of event.

The difference between click() and on("click") is that click() works on any element that exists on the page on loading. on("click") will work on any element that shows up at any time. 
