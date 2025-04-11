# Overview
An extension for Google Chrome that gets basic weather data for a searchable city.

# Technical desription
Upon entering the Name of a City a request is sent to convert the city name to a positon (latitude/longitude). The position is then directly used for a request to Open Meteo to get the weather info.
The city name is stored in the local Chrome storage, so that it is still entered when the extension is used the next time.

# Planned features
* Use current location
* add weather status (sunny, cloudy, etc)
* add custom icons