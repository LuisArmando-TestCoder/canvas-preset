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
    'nfc'
]

export default permission => {
    const permissionQuestion = { options }
    if (options.includes(permission)) {
        // gotta add the permission request ant this should be ready to be included
        permissionQuestion.result = navigator.permissions.query({name: permission})
    }
    return permissionQuestion
}
