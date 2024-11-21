class Car {
    constructor(sendMessage, objectName) {
        this.sendMessage = sendMessage;
        this.objectName = objectName;
    }

    // Method to move the car with custom speed and angle
    moveCar(speed, angle, duration) {
        const command = `${speed},${duration},${angle}`;
        this.sendMessage(this.objectName, "MoveCar", command);
        console.log(`Sending move command: ${command}`);
    }

    // Method to stop the car
    stop() {
        this.moveCar(0, 0, 0, 0, 0, duration);
    }

    // Method to move forward with specified speed and duration
    moveForward(speed = 100, duration = 2) {
        this.moveCar(speed, 0, duration);
    }

    // Method to move backward with specified speed and duration
    moveBackward(speed = 100, duration = 2) {
        this.moveCar(speed, 0, duration);
    }

    // Method to turn left with an angle
    turnLeft(speed = 100, angle = -30, duration = 2) {
        this.moveCar(speed, angle, duration);
    }

    // Method to turn right with an angle
    turnRight(speed = 100, angle = 30, duration = 2) {
        this.moveCar(speed, angle, duration);
    }
    resetCar(){
        this.sendMessage(this.objectName,"resetCarStatus");
    }
}

export default Car;