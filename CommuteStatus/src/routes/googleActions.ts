import { getNearestStation, getTrainPredictions, constructTrainPredictionMessage } from 'src/data/wmataApi';
import * as express from 'express';
import { ActionsSdkApp } from 'actions-on-google';
let router = express.Router();

/* GET home page. */
router.get('/', (req, res) => res.status(200).end());
router.post('/', actionHandler);

function actionHandler(req: express.Request, res: express.Response) {
    const app = new ActionsSdkApp({ request: req, response: res });

    // Create functions to handle requests here
    function mainIntent(app: ActionsSdkApp) {
        let permission: string = app.SupportedPermissions[app.SupportedPermissions.DEVICE_PRECISE_LOCATION];
        app.askForPermission('To find the nearest station', permission);
    }

    async function permissionGrantedIntent(app: ActionsSdkApp) {
        if (app.isPermissionGranted()) {
            let { latitude, longitude } = <{ latitude: number, longitude: number }>app.getDeviceLocation().coordinates;

            try {
                let station = await getNearestStation(latitude, longitude);
                let trainPredictions = await getTrainPredictions(station);
                let predictionMessage = constructTrainPredictionMessage(station, trainPredictions);
                app.tell(predictionMessage);
            } catch (error) {
                app.tell('Something went wrong when trying to get the DC Metro data');
            }
        } else {
            app.tell('Without the location, I cannot find the nearest station.');
        }
    }

    let actionMap = new Map();
    actionMap.set(app.StandardIntents.MAIN, mainIntent);
    actionMap.set(app.StandardIntents.PERMISSION, permissionGrantedIntent);

    //add more intents to the map
    app.handleRequest(actionMap);
}

export default router;

