const borker_host = 'iot.eclipse.org';
const borker_port = 1883;

const cmd_exec_topic = 'howtomakearobot';
const cmd_echo_topic = 'howtomakearobotecho';

exports.borker = `mqtt://${borker_host}:${borker_port}`

exports.cmd = {
    exec_topic: cmd_exec_topic,
    echo_topic: cmd_echo_topic
}