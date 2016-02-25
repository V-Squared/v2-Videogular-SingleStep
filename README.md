# v2-Videogular-SingleStep
Videogular Plugin to single step a video, frame by frame. Forwards and backwards.

# Known Issues
The video will go 1 frame backward when pausing if using a video that's not 20fps.

# Setup

## Add singleStep tag inside videogular:
![](docs/images/setup-singleStep-html.png)

## Notice the 2 properties.

1. frameRate : the fps of the video
2. theme : the css file of SingleStep

Both properties are required.

# Reference
## How to check the fps of a video

1. right-clicking it and click on properties
2. go to the Details tab
3. scroll to the video section and you can see the frame rate property

## My sublime theme

if you are interested on the theme, it's called brogrammer
