class Car {
    constructor(unityInstance, objectName) {
        this.unityInstance = unityInstance;
        this.objectName = objectName;
    }

    // Method to move the car with custom speed and angle
    moveCar(frontLeftSpeed, frontRightSpeed, rearLeftSpeed, rearRightSpeed, angle, duration) {
        const command = `${frontLeftSpeed},${frontRightSpeed},${rearLeftSpeed},${rearRightSpeed},${angle},${duration}`;
        this.unityInstance.SendMessage(this.objectName, "MoveCar", command);
        console.log(`Sending move command: ${command}`);
    }

    // Method to stop the car
    stop(duration = 3) {
        this.moveCar(0, 0, 0, 0, 0, duration);
    }

    // Method to move forward with specified speed and duration
    moveForward(speed = 100, duration = 2) {
        this.moveCar(speed, speed, speed, speed, 0, duration);
    }

    // Method to move backward with specified speed and duration
    moveBackward(speed = -100, duration = 2) {
        this.moveCar(speed, speed, speed, speed, 0, duration);
    }

    // Method to turn left with an angle
    turnLeft(speed = 100, angle = -30, duration = 2) {
        this.moveCar(speed, speed, speed, speed, angle, duration);
    }

    // Method to turn right with an angle
    turnRight(speed = 100, angle = 30, duration = 2) {
        this.moveCar(speed, speed, speed, speed, angle, duration);
    }
}

