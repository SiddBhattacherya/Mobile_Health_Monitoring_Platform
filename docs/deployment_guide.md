# Requirements
Before you deploy, you must have the following in place:
*  [AWS Account](https://aws.amazon.com/account/) 
*  [GitHub Account](https://github.com/) 
*  [Node 10 or greater](https://nodejs.org/en/download/) 
*  [Amplify CLI 4.13.1 or greater installed and configured](https://aws-amplify.github.io/docs/cli-toolchain/quickstart#quickstart) 
*  Please create a new Google Maps API Key by following the instructions here: https://developers.google.com/maps/documentation/javascript/get-api-key
   
   Please navigate to your project on the [Google Cloud Platform Console](https://console.cloud.google.com/). Then click on the top left menu button and select **APIs and Services**. Click on the **+ ENABLE APIS AND SERVICES** button at the top of the page. 
   Then search for and enable the following APIs:
      - Maps Javascript API
      - Places API


# Step 1: Front-end Deployment
In this step we will use the Amplify console to deploy and build the front-end application automatically. 

[![One-click deployment](https://oneclick.amplifyapp.com/button.svg)](https://console.aws.amazon.com/amplify/home#/deploy?repo=https://github.com/UBC-CIC/Mobile_Health_Monitoring_Platform)

1. **1-click deployment** button above. Make sure to start the deployment before continuing. 
2. Go to the [Amplify Console](https://console.aws.amazon.com/amplify/home).
3. Select the **MHMP** app.
4. Wait until **Provision, Build, Deploy and Verify** are all green. 
5. Click on the **Backend environments** tab.
6. Click on **File storage**.
7. Copy the bucket name Amplify created.  You will need this information for setting the environemnt variables in the next step.

<img src="./images/deployment/DeploymentGuide-1.png"  width="500"/>

8. In the left-hand menu under *App Settings*, click on **Environment Variables** then **Manage variables**.

<img src="./images/deployment/DeploymentGuide-2.png"  width="500"/>


9. Please add the following environment variables:
   ```javascript
   Variable: REACT_APP_AWS_S3_BUCKET        Value: <Name Of The S3 Bucket You Noted Down In The Previous Step>
   Variable: REACT_APP_AWS_S3_REGION        Value: ca-central-1
   Variable: REACT_APP_GOOGLE_MAPS_API_KEY  Value: <The Google Maps API Key You Created Earlier>
   ```
10. Click **Save**.

# Step 2: Deploy the Kinesis Data Streams



# Step 3: Deploy the Lambdas
## 3.1: Creating the Layer
When data is sent from a wearable device to the AWS IoT Core, it gets sent through the Kinesis Data Stream which then triggers a Lambda function for data processing. The Layer file contains the dependencies needed for all the Lambda functions. 

📓 **Note**: If you haven’t cloned the repo yet, the following steps require the files to be saved locally in your computer.


1. Navigate to the /backend/LambdaLayers/MHMP_NodeModules_Layer folder
