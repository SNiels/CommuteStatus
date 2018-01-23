/// <reference path="../data/wmataTypes.ts" />

export const stationResult: Wmata.Station = {
    "Code": "K04",
    "Name": "Ballston-MU",
    "StationTogether1": "",
    "StationTogether2": "",
    "LineCode1": "OR",
    "LineCode2": "SV",
    "LineCode3": null,
    "LineCode4": null,
    "Lat": 38.882071,
    "Lon": -77.111845,
    "Address": {
        "Street": "4230 Fairfax Drive",
        "City": "Arlington",
        "State": "VA",
        "Zip": "22201"
    }
};
export const trainsResult: Array<Wmata.TrainPrediction> = [
    {
      "Car": "8",
      "Destination": "Largo",
      "DestinationCode": "G05",
      "DestinationName": "Largo Town Center",
      "Group": "1",
      "Line": "SV",
      "LocationCode": "K04",
      "LocationName": "Ballston-MU",
      "Min": "BRD"
    },
    {
      "Car": "8",
      "Destination": "Vienna",
      "DestinationCode": "K08",
      "DestinationName": "Vienna/Fairfax-GMU",
      "Group": "2",
      "Line": "OR",
      "LocationCode": "K04",
      "LocationName": "Ballston-MU",
      "Min": "4"
    },
    {
      "Car": "8",
      "Destination": "NewCrltn",
      "DestinationCode": "D13",
      "DestinationName": "New Carrollton",
      "Group": "1",
      "Line": "OR",
      "LocationCode": "K04",
      "LocationName": "Ballston-MU",
      "Min": "7"
    },
    {
      "Car": "6",
      "Destination": "Wiehle",
      "DestinationCode": "N06",
      "DestinationName": "Wiehle-Reston East",
      "Group": "2",
      "Line": "SV",
      "LocationCode": "K04",
      "LocationName": "Ballston-MU",
      "Min": "7"
    },
    {
      "Car": "6",
      "Destination": "Largo",
      "DestinationCode": "G05",
      "DestinationName": "Largo Town Center",
      "Group": "1",
      "Line": "SV",
      "LocationCode": "K04",
      "LocationName": "Ballston-MU",
      "Min": "11"
    },
    {
      "Car": "8",
      "Destination": "Vienna",
      "DestinationCode": "K08",
      "DestinationName": "Vienna/Fairfax-GMU",
      "Group": "2",
      "Line": "OR",
      "LocationCode": "K04",
      "LocationName": "Ballston-MU",
      "Min": "11"
    }
];