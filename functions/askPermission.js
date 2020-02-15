const options = [
    'geolocation',
    'notifications',
    'push',
    'midi',
    'camera',
    'microphone',
    'speaker',
    'device-info',
    'background-fetch',
    'background-sync',
    'bluetooth',
    'persistent-storage',
    'ambient-light-sensor',
    'accelerometer',
    'gyroscope',
    'magnetometer',
    'clipboard',
    'display-capture',
    'nfc',
];

export default permission => {
    const permissionQuestion = { options };
    if (options.includes(permission)) {
        permissionQuestion.result = navigator.permissions.query({name: permission});
    }
    return permissionQuestion;
};