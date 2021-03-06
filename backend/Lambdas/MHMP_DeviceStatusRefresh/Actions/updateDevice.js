const AWS = require('aws-sdk');
const appsync = require('aws-appsync');
const { AUTH_TYPE } = require('aws-appsync-auth-link');
const gql = require('graphql-tag');
require('cross-fetch/polyfill');

/*
*   Description: Updates a given device's status
*   Required Inputs: deviceID, deviceStatus
*   Expected Output: No return value. Updates the device's deviceStatus field.
 */
const updateDevice = async (data) => {
    return new Promise(function(resolve, reject) {

        const { deviceID, deviceStatus } = data;

        const graphqlClient = new appsync.AWSAppSyncClient({
            url: process.env.GRAPHQL_ENDPOINT,
            region: process.env.AWS_REGION,
            auth: {
                type: AUTH_TYPE.AWS_IAM,
                credentials: AWS.config.credentials,
            },
            disableOffline: true
        });

        const mutation = gql`mutation updateDevice($input: UpdateDeviceInput!) {
            updateDevice(input: $input) {
                createdAt
                deviceOS
                deviceStatus
                id
                lastHeartRate
                updatedAt
                userID
                lastLocation {
                    lat
                    lng
                }
                geofence {
                    boundary {
                        lat
                        lng
                    }
                    createdAt
                    id
                    locationName
                    updatedAt
                }
            }
        }`;
            // update the device's status with the new anomaly
            graphqlClient.mutate({
                mutation,
                variables: {
                    input: {
                        id: deviceID,
                        deviceStatus: deviceStatus,
                    }
                }
            }).then(data => {
                resolve();
            }).catch(err => {
                console.log("Error updating device status: ", err);
                reject("Error updating device status: ", err);
            });


    });


}

module.exports = updateDevice;