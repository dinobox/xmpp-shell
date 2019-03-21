var mqtt = require('mqtt');
var shell = require('shelljs');
const config = require('./config');

get_client = () => {
    return mqtt.connect(config.borker);
}

var client = get_client();

client.on('connect', function () {
    client.subscribe(config.cmd.exec_topic, function (err) {
        if (err) {
            console.log(err);
            publish('sub err');
        } else {
            console.log("ok");
            publish('sub ok');
        }
    })
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
    const cmd = message.toString();
    console.log("cmd", cmd);
    switch (cmd) {
        case "ls":
            exec("ls");
            break;
        case "ip":
            exec("ifconfig");
            break;
        case "update":
            exec("git pull");
            break;
        case "df":
            exec("df");
            break;
        default:
            exec("whoami");
    }
    //client.end()
});

pub = (topic, msg) => {
    client.publish(topic, msg);
}

publish = (msg) => {
    pub(config.cmd.echo_topic, msg);
}

exec = (cmd) => {
    shell.exec(cmd, function (code, stdout, stderr) {
        if (code == 0) {
            publish(stdout);
            console.log(stdout);
        } else {
            publish(stderr);
            console.log('error:', stderr);
        }
    });
}