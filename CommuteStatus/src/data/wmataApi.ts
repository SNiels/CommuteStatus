import { wmataApiKey } from 'src/options';
import * as request from 'request-promise-native';

export async function getNearestStation(lat: number, long: number): Promise<any> {
    let options = {
        url: `https://api.wmata.com/Rail.svc/json/jStations`,
        headers: {
            api_key: wmataApiKey
        },
        json: true
    };
    return request(options)
        .then(response => calculateNearestStation(response.Stations, lat, long));
};

function calculateNearestStation(stations: Array<Wmata.Station>, lat: number, long: number): Wmata.Station {
    let stationDistances = stations.map(station => {
            return {
                distance: getDistanceFromLatLonInKm(station.Lat, station.Lon, lat, long),
                station
            };
        })
        .sort((stationDistance1, stationDistance2) => stationDistance1.distance - stationDistance2.distance);
    return stationDistances[0].station;
}

export async function getTrainPredictions(station: Wmata.Station): Promise<Array<Wmata.TrainPrediction>> {
    let options = {
        url: `https://api.wmata.com/StationPrediction.svc/json/GetPrediction/${station.Code}`,
        headers: {
            api_key: wmataApiKey
        },
        json: true
    };
    return request(options)
        .then(response => response.Trains);
};

export function constructTrainPredictionMessage(station: Wmata.Station, trainPredictions: Array<Wmata.TrainPrediction>): string {
    if (!trainPredictions || trainPredictions.length === 0) {
        return `There are no upcoming trains at ${station.Name}`;
    }

    let resultString = `These are the upcoming trains at ${station.Name}: `;
    let groupedTrains = groupBy(trainPredictions, train => train.Destination);

    for (let keyValue of groupedTrains) {
        let trains = keyValue[1];
        resultString += ` One train to ${trains[0].DestinationName} `;
        let hasBoardingTrain = false;
        for (let i = 0; i < trains.length; i++) {
            let train = trains[i];
            switch (train.Min) {
                case 'ARR':
                    resultString += ' arriving now, ';
                    break;
                case 'BRD':
                    hasBoardingTrain = true;
                    resultString += ' boarding now, ';
                    break;
                default:
                    if (i !== 0 && i + 1 === trains.length) {
                        resultString += ' and ';
                    }

                    if (hasBoardingTrain && i === 1) {
                        resultString += ' 1 train arriving ';
                    }

                    resultString += ` in ${train.Min} minutes `;

                    if (i !== trains.length - 1) {
                        resultString += ', ';
                    }
                    break;
            }
        };
        //resultString = resultString.substring(0, resultString.length - 1);
        resultString += '.';
    }

    resultString = resultString
        .replace(/  +/g, ' ')
        .replace(/ \.+/g, '.')
        .replace(/ \,+/g, ',');
    return resultString;
}

function getDistanceFromLatLonInKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1);  // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2)
        ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
}

function deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
}

function groupBy<T1, T2>(list: Array<T1>, keyGetter: (item: T1) => T2): Map<T2, Array<T1>> {
    const map = new Map();
    list.forEach((item) => {
        const key = keyGetter(item);
        const collection = map.get(key);
        if (!collection) {
            map.set(key, [item]);
        } else {
            collection.push(item);
        }
    });
    return map;
}