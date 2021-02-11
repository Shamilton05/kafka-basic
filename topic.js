const {Kafka} = require("kafkajs")

run();
async function run() {
    try {
        //establish tcp connection
        const kafka = new Kafka({
            "clientId": "myapp",
            "brokers": ["kafka:9092"]
        })

        const admin = kafka.admin();
        console.log("Connecting...")
        await admin.connect()
        console.log("Connected!")
        await admin.createTopics({
            "topics": [{
                "topic": "Users",
                "numPartitions": 2
            }]
        })
        console.log("Created topics successfully")
        await admin.disconnect()
    }

    catch (ex){
        console.error('Something bad happened ${ex}')
    }
    finally {
        process.exit(0)
    }
}