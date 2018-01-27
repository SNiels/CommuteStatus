import { trainsResult, stationResult } from 'src/test/testData';
import { getNearestStation, getTrainPredictions, constructTrainPredictionMessage } from 'src/data/wmataApi';
const latitude = 38.8784023,
    longitude= -77.1082332;
describe('wmataApi', () => {

    test('Nearest station should be Ballston', async () => {
        let station = await getNearestStation(latitude, longitude);
        expect(station.Code).toBe('K04');
    });

    test('Find at least one train', async () => {
        let trainPredictions = await getTrainPredictions(stationResult);
        expect(trainPredictions).toBeTruthy();
        let now = new Date().getHours();
        let anyTrains = trainPredictions.length > 0;
        if(now > 23 || now < 6){
            if(!anyTrains){
                console.log('It\'s between 23 and 6, no trains it\'s not unusual');
            }else{
                expect(anyTrains).toBeTruthy();
            }
        }else{
            expect(anyTrains).toBeTruthy();
        }
    });

    test('Construct a prediction message', () => {
        var message = constructTrainPredictionMessage(stationResult, trainsResult);
        expect(message).toBe(
    'These are the upcoming trains at Ballston-MU: One train to Largo Town Center boarding now, and 1 train arriving in 11 minutes. One train to Vienna/Fairfax-GMU in 4 minutes, and in 11 minutes. One train to New Carrollton in 7 minutes. One train to Wiehle-Reston East in 7 minutes.');
    });

});