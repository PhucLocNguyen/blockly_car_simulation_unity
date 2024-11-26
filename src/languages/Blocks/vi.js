import * as Blockly from 'blockly/core';

//General
Blockly.Msg["High_status"] = "Cao"
Blockly.Msg["Low_status"] = "Thấp"
// Time
Blockly.Msg["seconds_translate"] = "giây"
Blockly.Msg["1_seconds_translate"] = "giây"
Blockly.Msg["miliseconds_translate"] = "mili giây"

// Basic
Blockly.Msg['SLEEP_MS_TITLE'] = 'chờ';
Blockly.Msg['SLEEP_MS_TOOLTIP'] = 'Chờ trong một khoảng thời gian cụ thể tính bằng mili giây';
Blockly.Msg['PIN_BINARY_TITLE'] = 'thiết lập trạng thái chân';
Blockly.Msg['PIN_BINARY_TOOLTIP'] = 'Thiết lập trạng thái logic cao hoặc thấp của chân GPIO';

//Event
Blockly.Msg['BUTTON_PRESS_TITLE'] = 'khi nút bấm trên chân#';
Blockly.Msg['BUTTON_PRESS_PRESSED'] = 'được nhấn';
Blockly.Msg['BUTTON_PRESS_DO'] = 'thực hiện';
Blockly.Msg['BUTTON_PRESS_TOOLTIP'] = 'Phát hiện nút bấm trên một chân cụ thể và thực thi các lệnh.';
Blockly.Msg['FOREVER_LOOP_TITLE'] = 'liên tục';
Blockly.Msg['FOREVER_LOOP_DO'] = 'thực hiện';
Blockly.Msg['FOREVER_LOOP_TOOLTIP'] = 'Liên tục thực thi các khối được bao bọc.';

// FSTEM
Blockly.Msg['GPIO_SETUP_BOARD_TITLE'] = 'Thiết lập chế độ GPIO';
Blockly.Msg['GPIO_SETUP_BOARD_TOOLTIP'] = 'Thiết lập chế độ GPIO thành BCM hoặc BOARD.';
Blockly.Msg['SET_MOTOR_SPEED_TITLE'] = 'Thiết lập tốc độ động cơ';
Blockly.Msg['SET_MOTOR_SPEED_LEFT'] = 'trái';
Blockly.Msg['SET_MOTOR_SPEED_RIGHT'] = 'phải';
Blockly.Msg['SET_MOTOR_SPEED_TOOLTIP'] = 'Thiết lập tốc độ cho cả động cơ trái và phải.';
Blockly.Msg['SET_MOTOR_PINS_TITLE'] = 'Thiết lập chân động cơ';
Blockly.Msg['SET_MOTOR_PINS_MOTOR_A'] = 'Động cơ A (tiến, lùi)';
Blockly.Msg['SET_MOTOR_PINS_MOTOR_B'] = 'Động cơ B (tiến, lùi)';
Blockly.Msg['SET_MOTOR_PINS_TOOLTIP'] = 'Thiết lập các chân GPIO cho các động cơ.';

// Function
Blockly.Msg['GPIO_SETUP_BOARD_TITLE'] = 'Thiết lập chế độ GPIO';
Blockly.Msg['GPIO_SETUP_BOARD_TOOLTIP'] = 'Thiết lập chế độ GPIO thành BCM hoặc BOARD.';
Blockly.Msg['SET_MOTOR_SPEED_TITLE'] = 'Thiết lập tốc độ động cơ';
Blockly.Msg['SET_MOTOR_SPEED_LEFT'] = 'trái';
Blockly.Msg['SET_MOTOR_SPEED_RIGHT'] = 'phải';
Blockly.Msg['SET_MOTOR_SPEED_TOOLTIP'] = 'Thiết lập tốc độ cho cả động cơ trái và phải.';
Blockly.Msg['SET_MOTOR_PINS_TITLE'] = 'Thiết lập chân động cơ';
Blockly.Msg['SET_MOTOR_PINS_MOTOR_A'] = 'Động cơ A (tiến, lùi)';
Blockly.Msg['SET_MOTOR_PINS_MOTOR_B'] = 'Động cơ B (tiến, lùi)';
Blockly.Msg['SET_MOTOR_PINS_TOOLTIP'] = 'Thiết lập các chân GPIO cho các động cơ.';
Blockly.Msg['DEFINE_CUSTOM_FUNCTION_TITLE'] = 'định nghĩa hàm';
Blockly.Msg['DEFINE_CUSTOM_FUNCTION_DO'] = 'thực hiện';
Blockly.Msg['DEFINE_CUSTOM_FUNCTION_TOOLTIP'] = 'Định nghĩa một hàm tùy chỉnh có thể được tái sử dụng.';
Blockly.Msg['CALL_CUSTOM_FUNCTION_TITLE'] = 'gọi hàm';
Blockly.Msg['CALL_CUSTOM_FUNCTION_TOOLTIP'] = 'Gọi một hàm tùy chỉnh đã được định nghĩa trước đó.';

// Logic
Blockly.Msg['LOGIC_COMPARE_TOOLTIP'] = 'So sánh hai số.';
Blockly.Msg['LOGIC_COMPARE_STRING_TOOLTIP'] = 'So sánh hai chuỗi.';

// Loop
Blockly.Msg['FOREVER_LOOP_DO'] = 'thực hiện';
Blockly.Msg['FOREVER_LOOP_TOOLTIP'] = 'Liên tục thực hiện các khối được bao quanh.';

// Math 
Blockly.Msg['MATH_CHANGE_TITLE'] = 'thay đổi %1 bởi %2';
Blockly.Msg['MATH_CHANGE_VARIABLE'] = 'mục';
Blockly.Msg['MATH_CHANGE_TOOLTIP'] = 'Cộng một số vào biến "%1".';
Blockly.Msg['MATH_RANDOM_TITLE'] = 'Chọn ngẫu nhiên';
Blockly.Msg['MATH_RANDOM_TO'] = 'đến';
Blockly.Msg['MATH_RANDOM_REMAINDER'] = 'Chia lấy dư';

// Pin
Blockly.Msg['GPIO_SET_DIGITAL_WRITE_PIN'] = 'Ghi kỹ thuật số vào chân';
Blockly.Msg['GPIO_SET_DIGITAL_TO'] = 'thành';
Blockly.Msg['GPIO_SET_DIGITAL_TOOLTIP'] = 'Thiết lập chân GPIO ở trạng thái cao hoặc thấp.';
Blockly.Msg['GPIO_READ_DIGITAL_PIN'] = 'Đọc kỹ thuật số từ chân';
Blockly.Msg['GPIO_READ_DIGITAL_TOOLTIP'] = 'Đọc trạng thái của chân GPIO.';
Blockly.Msg['GPIO_CLEANUP'] = 'đặt lại cài đặt GPIO';
Blockly.Msg['GPIO_CLEANUP_TOOLTIP'] = 'Đặt lại tất cả cài đặt GPIO về trạng thái mặc định.';

// PWM
Blockly.Msg['PWM_SETUP_PIN'] = 'thiết lập PWM trên chân';
Blockly.Msg['PWM_SETUP_FREQUENCY'] = 'với tần số (Hz)';
Blockly.Msg['PWM_SETUP_TOOLTIP'] = 'Thiết lập PWM với tần số cụ thể.';
Blockly.Msg['PWM_START_STOP_ACTION'] = 'PWM';
Blockly.Msg['PWM_START'] = 'bắt đầu';
Blockly.Msg['PWM_STOP'] = 'dừng';
Blockly.Msg['PWM_ON_PIN'] = 'trên chân';
Blockly.Msg['PWM_START_STOP_TOOLTIP'] = 'Bắt đầu hoặc dừng PWM trên chân cụ thể.';
Blockly.Msg['PWM_CHANGE_DUTY_CYCLE_PIN'] = 'thay đổi chu kỳ PWM trên chân';
Blockly.Msg['PWM_CHANGE_DUTY_CYCLE_TO'] = 'thành';
Blockly.Msg['PWM_CHANGE_DUTY_CYCLE_TOOLTIP'] = 'Thay đổi chu kỳ làm việc của PWM trên chân cụ thể.';

// Sensors
Blockly.Msg['TEMPERATURE_SENSOR_READ'] = 'đọc nhiệt độ từ cảm biến ở chân';
Blockly.Msg['TEMPERATURE_SENSOR_READ_TOOLTIP'] = 'Đọc giá trị nhiệt độ từ cảm biến kết nối với chân GPIO cụ thể.';
Blockly.Msg['ULTRASONIC_SENSOR_TRIGGER'] = 'kích hoạt cảm biến siêu âm với chân kích hoạt';
Blockly.Msg['ULTRASONIC_SENSOR_ECHO'] = 'và chân echo';
Blockly.Msg['ULTRASONIC_SENSOR_TRIGGER_TOOLTIP'] = 'Kích hoạt cảm biến siêu âm và đọc giá trị khoảng cách.';
Blockly.Msg['ANGULAR_SERVO_SET'] = 'thiết lập góc cho AngularServo ở chân';
Blockly.Msg['ANGULAR_SERVO_ANGLE'] = 'đến góc';
Blockly.Msg['ANGULAR_SERVO_TOOLTIP'] = 'Thiết lập góc cho AngularServo tới góc cụ thể.';

// Variables
Blockly.Msg['VARIABLE_UNTYPED'] = 'biến:';
Blockly.Msg['VARIABLE_UNTYPED_TOOLTIP'] = 'Tạo một biến bằng cách gán giá trị.';
Blockly.Msg['VARIABLE_TYPED'] = 'biến:';
Blockly.Msg['VARIABLE_TYPED_TOOLTIP'] = 'Tạo một biến với giá trị văn bản.';
Blockly.Msg['TEXT_PRINT'] = 'in ra';
Blockly.Msg['TEXT_PRINT_TOOLTIP'] = 'In giá trị của đầu vào.';

//Car movement
Blockly.Msg["SET_CAR_SPEED_ANGLE_TITLE"] = "Thiết lập tốc độ và góc của xe";
Blockly.Msg["SET_CAR_SPEED"] = "Tốc độ";
Blockly.Msg["SET_CAR_SPEED_RIGHT"] = "Tốc độ bên phải";
Blockly.Msg["SET_CAR_ANGLE"] = "Góc";
Blockly.Msg["SET_CAR_SPEED_ANGLE_TOOLTIP"] = "Thiết lập tốc độ bánh xe bên trái, bên phải và góc của xe.";
Blockly.Msg["BKY_SET_CAR_DURATION"] = "trong khoảng";

// Car Map
Blockly.Msg['BKY_Road_Map_LineTracking_TITLE'] = "Chế độ bám vạch";
Blockly.Msg['Event_Execute_title'] = "thực thi";
Blockly.Msg['BKY_Road_Map_LineTracking_toolTip'] = "Khối này thực thi các khối bên trong khi xảy ra sự kiện bám vạch.";

Blockly.Msg['BKY_Road_Map_Normal_TITLE'] = "Chế độ bản đồ bình thường";
Blockly.Msg['BKY_Road_Map_Normal_Execute_title'] = "thực thi";
Blockly.Msg['BKY_Road_Map_Normal_toolTip'] = "Khối này thực thi các khối bên trong khi sự kiện bản đồ bình thường xảy ra.";

// Math block
Blockly.Msg['MATH_ADDITION_TITLE'] = "Cộng";
Blockly.Msg['MATH_ADDITION_TOOLTIP'] = "Trả về tổng của hai số.";

Blockly.Msg['MATH_SUBTRACTION_TITLE'] = "Trừ";
Blockly.Msg['MATH_SUBTRACTION_TOOLTIP'] = "Trả về hiệu của hai số.";

Blockly.Msg['MATH_MULTIPLICATION_TITLE'] = "Nhân";
Blockly.Msg['MATH_MULTIPLICATION_TOOLTIP'] = "Trả về tích của hai số.";

Blockly.Msg['MATH_DIVISION_TITLE'] = "Chia";
Blockly.Msg['MATH_DIVISION_TOOLTIP'] = "Trả về thương của hai số.";
