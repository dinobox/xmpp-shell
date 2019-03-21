var mqtt = require('mqtt');
var shell = require('shelljs');
const config = require('./config');
get_client = () => {
    return mqtt.connect(config.borker);
}

var client = get_client();

client.on('connect', function () {
    client.subscribe(config.cmd.echo_topic, function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log("ok");
        }
    })
    console.log("connected");
    exec = process.argv[2];
    if (exec) {
        publish(exec);
    }
})

client.on('reconnect', function () {
    console.log("reconnect");
});

client.on('offline', function () {
    client = get_client();
});

client.on('error', function (error) {
    console.log("error:", error);
});

client.on('message', function (topic, message) {
    // message is Buffer
    const echo = message.toString();
    console.log(echo);
    client.end();
});

pub = (topic, msg) => {
    client.publish(topic, msg);
    console.log("finish");
    
}

publish = (msg) => {
    pub(config.cmd.exec_topic, msg);
}