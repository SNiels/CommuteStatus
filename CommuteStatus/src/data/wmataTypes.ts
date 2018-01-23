namespace Wmata {
    export interface Station {
        Code: string;
        Name: string;
        StationTogether1: string;
        StationTogether2: string;
        LineCode1: string;
        LineCode2: string;
        LineCode3?: null;
        LineCode4?: null;
        Lat: number;
        Lon: number;
        Address: Address;
    }
    export interface Address {
        Street: string;
        City: string;
        State: string;
        Zip: string;
    }
    export interface TrainPrediction {
        Car: string;
        Destination: string;
        DestinationCode: string;
        DestinationName: string;
        Group: string;
        Line: string;
        LocationCode: string;
        LocationName: string;
        Min: string;
    }
}
