

## Environment Setup #

We're assuming that you're using OSX.


1. install nodejs. The latest version can be found (here)[https://nodejs.org/en/]. Of you're already running nodejs, make sure you're using at least version 8.9.0.


2. install a global version of the @angular/cli

``npm install -g @angular/cli``

3. install nodemon
``npm install -g nodemon``


## Running the app ##
1. After the cloning the repos, navigate to 
2. Navigate to the back-end, run ``npm install`` and then run ``npm start``
3. Navigate to the front-end, run ``npm install`` and then run ``ng serve``
4. Open a browser and go to localhost:4200.

## How it works ##

The front-end accepts a CAD file, sends it to the back-end for enrichment, then takes the response and displays it in the marker annotation on the map.


## did you complete the project? ##

Almost. My solution is capable of receiving a CAD file, enriching it with data from a weather API and a parcel API, and displaying the results on a map in the web browser. I'm able to use the web parcel API you provided to gather information about the state the incident occurred in, but I haven't figured out how to narrow it down to a more specific geo location. 


## how much time did you spend on the project? ##

I've spent about 14 hours on this project.
2 hours troubleshooting node environment issues on my computer (resolved)
1 hours stroubleshooting why Google Maps won't display on node
11 hours on development


## Add a couple of screen shots to the repo that show the working version as running on your machine. ##

The screenshots are located in the project's root.
