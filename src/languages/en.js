import * as Blockly from 'blockly/core';

//General
Blockly.Msg["High_status"] ="High"
Blockly.Msg["Low_status"] ="Low"
// Time
Blockly.Msg["seconds_translate"]="seconds"
Blockly.Msg["1_seconds_translate"]="second"
Blockly.Msg["miliseconds_translate"]="miliseconds"

// Basic
Blockly.Msg['SLEEP_MS_TITLE'] = 'wait';
Blockly.Msg['SLEEP_MS_TOOLTIP'] = 'Wait for a specific time in milliseconds';
Blockly.Msg['PIN_BINARY_TITLE'] = 'set pin state';
Blockly.Msg['PIN_BINARY_TOOLTIP'] = 'Set the logic state (high or low) of a GPIO pin';

// Event
Blockly.Msg['BUTTON_PRESS_TITLE'] = 'when button on pin#';
Blockly.Msg['BUTTON_PRESS_PRESSED'] = 'is pressed';
Blockly.Msg['BUTTON_PRESS_DO'] = 'do';
Blockly.Msg['BUTTON_PRESS_TOOLTIP'] = 'Detect button press on a specific pin and execute statements.';
Blockly.Msg['FOREVER_LOOP_TITLE'] = 'forever';
Blockly.Msg['FOREVER_LOOP_DO'] = 'do';
Blockly.Msg['FOREVER_LOOP_TOOLTIP'] = 'Continuously execute the enclosed blocks.';

// FSTEM
Blockly.Msg['GPIO_SETUP_BOARD_TITLE'] = 'Set GPIO mode';
Blockly.Msg['GPIO_SETUP_BOARD_TOOLTIP'] = 'Set the GPIO mode to BCM or BOARD.';
Blockly.Msg['SET_MOTOR_SPEED_TITLE'] = 'Set motor speed';
Blockly.Msg['SET_MOTOR_SPEED_LEFT'] = 'left';
Blockly.Msg['SET_MOTOR_SPEED_RIGHT'] = 'right';
Blockly.Msg['SET_MOTOR_SPEED_TOOLTIP'] = 'Set the speed for both left and right motors.';
Blockly.Msg['SET_MOTOR_PINS_TITLE'] = 'Set motor pins';
Blockly.Msg['SET_MOTOR_PINS_MOTOR_A'] = 'Motor A (forward, backward)';
Blockly.Msg['SET_MOTOR_PINS_MOTOR_B'] = 'Motor B (forward, backward)';
Blockly.Msg['SET_MOTOR_PINS_TOOLTIP'] = 'Set the GPIO pins for the motors.';

// Function
Blockly.Msg['GPIO_SETUP_BOARD_TITLE'] = 'Set GPIO mode';
Blockly.Msg['GPIO_SETUP_BOARD_TOOLTIP'] = 'Set the GPIO mode to BCM or BOARD.';
Blockly.Msg['SET_MOTOR_SPEED_TITLE'] = 'Set motor speed';
Blockly.Msg['SET_MOTOR_SPEED_LEFT'] = 'left';
Blockly.Msg['SET_MOTOR_SPEED_RIGHT'] = 'right';
Blockly.Msg['SET_MOTOR_SPEED_TOOLTIP'] = 'Set the speed for both left and right motors.';
Blockly.Msg['SET_MOTOR_PINS_TITLE'] = 'Set motor pins';
Blockly.Msg['SET_MOTOR_PINS_MOTOR_A'] = 'Motor A (forward, backward)';
Blockly.Msg['SET_MOTOR_PINS_MOTOR_B'] = 'Motor B (forward, backward)';
Blockly.Msg['SET_MOTOR_PINS_TOOLTIP'] = 'Set the GPIO pins for the motors.';
Blockly.Msg['DEFINE_CUSTOM_FUNCTION_TITLE'] = 'define function';
Blockly.Msg['DEFINE_CUSTOM_FUNCTION_DO'] = 'do';
Blockly.Msg['DEFINE_CUSTOM_FUNCTION_TOOLTIP'] = 'Define a custom function that can be reused.';
Blockly.Msg['CALL_CUSTOM_FUNCTION_TITLE'] = 'call function';
Blockly.Msg['CALL_CUSTOM_FUNCTION_TOOLTIP'] = 'Call a previously defined custom function.';

// Logic
Blockly.Msg['LOGIC_COMPARE_TOOLTIP'] = 'Compare two numbers.';
Blockly.Msg['LOGIC_COMPARE_STRING_TOOLTIP'] = 'Compare two strings.';

// Loop
Blockly.Msg['FOREVER_LOOP_TITLE'] = 'forever';
Blockly.Msg['FOREVER_LOOP_DO'] = 'do';

// Math 
Blockly.Msg['MATH_CHANGE_TITLE'] = 'change %1 by %2';
Blockly.Msg['MATH_CHANGE_VARIABLE'] = 'item';
Blockly.Msg['MATH_CHANGE_TOOLTIP'] = 'Add a number to variable "%1".';

// Pin
Blockly.Msg['GPIO_SET_DIGITAL_WRITE_PIN'] = 'Digital write pin';
Blockly.Msg['GPIO_SET_DIGITAL_TO'] = 'to';
Blockly.Msg['GPIO_SET_DIGITAL_TOOLTIP'] = 'Set a Digital GPIO pin to high or low state.';
Blockly.Msg['GPIO_READ_DIGITAL_PIN'] = 'Digital read pin';
Blockly.Msg['GPIO_READ_DIGITAL_TOOLTIP'] = 'Read the state of a Digital GPIO pin.';
Blockly.Msg['GPIO_CLEANUP'] = 'reset GPIO settings';
Blockly.Msg['GPIO_CLEANUP_TOOLTIP'] = 'Resets all GPIO settings to their default state.';

// PWM
Blockly.Msg['PWM_SETUP_PIN'] = 'setup PWM on pin';
Blockly.Msg['PWM_SETUP_FREQUENCY'] = 'with frequency (Hz)';
Blockly.Msg['PWM_SETUP_TOOLTIP'] = 'Setup PWM with a specific frequency.';
Blockly.Msg['PWM_START_STOP_ACTION'] = 'PWM';
Blockly.Msg['PWM_START'] = 'start';
Blockly.Msg['PWM_STOP'] = 'stop';
Blockly.Msg['PWM_ON_PIN'] = 'on pin';
Blockly.Msg['PWM_START_STOP_TOOLTIP'] = 'Start or stop PWM on a specific pin.';
Blockly.Msg['PWM_CHANGE_DUTY_CYCLE_PIN'] = 'change PWM duty cycle on pin';
Blockly.Msg['PWM_CHANGE_DUTY_CYCLE_TO'] = 'to';
Blockly.Msg['PWM_CHANGE_DUTY_CYCLE_TOOLTIP'] = 'Change the duty cycle of PWM on a specific pin.';

// Sensors
Blockly.Msg['TEMPERATURE_SENSOR_READ'] = 'read temperature from sensor on pin';
Blockly.Msg['TEMPERATURE_SENSOR_READ_TOOLTIP'] = 'Read the temperature value from a temperature sensor connected to a specific pin.';
Blockly.Msg['ULTRASONIC_SENSOR_TRIGGER'] = 'trigger ultrasonic sensor with trigger pin';
Blockly.Msg['ULTRASONIC_SENSOR_ECHO'] = 'and echo pin';
Blockly.Msg['ULTRASONIC_SENSOR_TRIGGER_TOOLTIP'] = 'Trigger an ultrasonic sensor and read the distance value.';
Blockly.Msg['ANGULAR_SERVO_SET'] = 'set AngularServo on pin';
Blockly.Msg['ANGULAR_SERVO_ANGLE'] = 'to angle';
Blockly.Msg['ANGULAR_SERVO_TOOLTIP'] = 'Set an AngularServo to a specific angle.';

// Variables
Blockly.Msg['VARIABLE_UNTYPED'] = 'variable:';
Blockly.Msg['VARIABLE_UNTYPED_TOOLTIP'] = 'Create a variable by assigning a value.';
Blockly.Msg['VARIABLE_TYPED'] = 'variable:';
Blockly.Msg['VARIABLE_TYPED_TOOLTIP'] = 'Create a variable with a text value.';
Blockly.Msg['TEXT_PRINT'] = 'print';
Blockly.Msg['TEXT_PRINT_TOOLTIP'] = 'Print the value of the input.';