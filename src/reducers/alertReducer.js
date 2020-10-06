

const initialAlerts = [];

// delete alert
const deleteAlertHelper = (alerts, target) => {
    const index = alerts.findIndex(alert =>
        alert.id === target.id
    );

    if (index !== -1) {
        alerts.splice(index, 1);
    }

    return alerts;
}

const alertReducer = (alerts = initialAlerts, action) => {
    let newAlerts = [...alerts];
    switch (action.type) {
        case "FETCH_ALERTS_SUCCESS": {
            return action.payload.sort((a,b) => {
                return b.createdAt - a.createdAt;
            });
        }
        case "NEW_ALERT_RECEIVED": {
            return [action.payload, ...newAlerts];
        }
        case "DELETE_ALERT_REQUEST": {
            return deleteAlertHelper(newAlerts, action.payload);
        }
        default:
            return newAlerts;
    }
}



export default alertReducer;