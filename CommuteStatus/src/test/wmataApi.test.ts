import test from 'ava';
import { trainsResult, stationResult } from 'src/test/testData';
import { getNearestStation, getTrainPredictions, constructTrainPredictionMessage } from 'src/data/wmataApi';
const latitude = 38.8784023,
    longitude= -77.1082332;

test('Nearest station is Ballston', async t => {
    try {
        let station = await getNearestStation(latitude, longitude);
        t.is(station.Code, 'K04');
    } catch (e) {
        t.fail(e);
    }
});

test('Find trains', async t => {
    try {
        let trainPredictions = await getTrainPredictions(stationResult);
        t.true(!!trainPredictions);
        let now = new Date().getHours();
        let anyTrains = trainPredictions.length > 0;
        if(now > 23 || now < 6){
            if(!anyTrains){
                t.log('It\'s between 23 and 6, no trains it\'s not unusual');
            }else{
                t.true(anyTrains);
            }
        }else{
            t.true(anyTrains);
        }
    } catch (e) {
        t.fail(e);
    }
});

test('Construct a message', t => {
    var message = constructTrainPredictionMessage(stationResult, trainsResult);
    t.is(message,
'These are the upcoming trains at Ballston-MU: One train to Largo Town Center boarding now, and 1 train arriving in 11 minutes. One train to Vienna/Fairfax-GMU in 4 minutes, and in 11 minutes. One train to New Carrollton in 7 minutes. One train to Wiehle-Reston East in 7 minutes.');
});