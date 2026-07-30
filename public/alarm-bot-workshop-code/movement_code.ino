// Project Beacon Motor Test
//
// Motor speed values:
//  90 = full speed forward
//   0 = stopped
// -90 = full speed backward
//
// Press the rotary encoder button to start the motor test.
// Press it again to stop the test.
//

// Libraries
#include <Arduino.h>
#include <Wire.h>
#include <Adafruit_GFX.h>      // Adafruit GFX Library by Adafruit
#include <Adafruit_SH110X.h>   // Adafruit SH110X Library by Adafruit
#include <Servo.h>             // Servo Library by Michael Margolis


// Pin numbers
#define ENCODER_BUTTON_PIN 7
#define LEFT_MOTOR_PIN 9
#define RIGHT_MOTOR_PIN 10


// Motor speed values
#define LEFT_MOTOR_STOP_SPEED 0
#define RIGHT_MOTOR_STOP_SPEED 0

#define MINIMUM_MOTOR_SPEED -90
#define MAXIMUM_MOTOR_SPEED 90


// OLED screen settings
#define SCREEN_WIDTH 128
#define SCREEN_HEIGHT 64
#define OLED_I2C_ADDRESS 0x3C

Adafruit_SH1106G oledDisplay(
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  &Wire,
  -1
);


// Motor objects
Servo leftMotorServo;
Servo rightMotorServo;


// Motor test state
bool motorTestRunning = false;


// Movement sequence state
//
// These variables allow the student movement commands to run
// one step at a time without using delay().
int currentMovementStep = 0;
int currentMovementCommand = 0;

bool movementWaitActive = false;
unsigned long movementWaitStartTimeMs = 0;


// Button state
//
// INPUT_PULLUP is used for the button.
// This means:
// HIGH = button released
// LOW  = button pressed
bool previousButtonState = HIGH;
bool buttonReadyForPress = true;

unsigned long lastButtonStateChangeTimeMs = 0;
const unsigned long BUTTON_DEBOUNCE_TIME_MS = 30;


// Function declarations

// Student movement program
void runStudentMotorTest(void);

// Motor control
void setLeftMotorSpeed(int speed);
void setRightMotorSpeed(int speed);
void stopBothMotors(void);

// Movement sequence control
void resetMovementSequence(void);
void beginMovementSequence(void);
void endMovementSequence(void);

void runLeftMotorCommand(int speed);
void runRightMotorCommand(int speed);
void runMovementWaitCommand(unsigned long durationMs);

// OLED screen
void drawCenteredText(const char *firstLine, const char *secondLine = "");
void drawUserInterface(void);

// Button
void updateEncoderButton(void);


// Student movement commands
//
// These commands are used only inside runStudentMotorTest().
//
// leftMotor(speed)
// rightMotor(speed)
// wait(seconds)
#define leftMotor(speed) runLeftMotorCommand(speed)
#define rightMotor(speed) runRightMotorCommand(speed)
#define wait(seconds) runMovementWaitCommand((unsigned long)((seconds) * 1000.0))


// Student movement code
void runStudentMotorTest(void)
{
  // Reset the command counter before reading the student commands.
  beginMovementSequence();

  // =====================================================
  // =========== STUDENT MOVEMENT CODE START =============
  // =====================================================

  // Motor speed values:
  //
  //  90 = full speed forward
  //   0 = stopped
  // -90 = full speed backward
  //
  // Any number between -90 and 90 can be used.
  //
  // Both motors use the same direction system.
  // Positive values move both wheels forward.
  // Negative values move both wheels backward.


  // Example: move forward, then move backward
  //
  // Remove the // symbols to use this example.
  //
  // leftMotor(50);
  // rightMotor(50);
  // wait(3);
  //
  // leftMotor(-50);
  // rightMotor(-50);
  // wait(3);
  //
  // leftMotor(0);
  // rightMotor(0);


  // Example: turn in a large circle
  //
  // The left motor moves more slowly than the right motor.
  //
  // leftMotor(20);
  // rightMotor(50);
  // wait(4);
  //
  // leftMotor(0);
  // rightMotor(0);


  // Example: spin on the spot
  //
  // One wheel moves forward while the other moves backward.
  //
  // leftMotor(50);
  // rightMotor(-50);
  // wait(2);
  //
  // leftMotor(0);
  // rightMotor(0);


  // =====================================================
  // ============ STUDENT MOVEMENT CODE END ==============
  // =====================================================

  // Check whether every student command has finished.
  endMovementSequence();
}


// Remove the student command macros outside the student section.
#undef leftMotor
#undef rightMotor
#undef wait


// Motor functions

// Set the speed of the left continuous-rotation servo.
//
// The student speed value is limited to between -90 and 90.
//
// The Servo library uses values from 0 to 180:
//   0   = full speed in one direction
//   90  = stopped
//   180 = full speed in the other direction
//
// Adding 90 changes the student speed into a Servo library value.
void setLeftMotorSpeed(int speed)
{
  speed = constrain(
    speed,
    MINIMUM_MOTOR_SPEED,
    MAXIMUM_MOTOR_SPEED
  );

  int servoCommand = 90 + speed;

  leftMotorServo.write(servoCommand);
}


// Set the speed of the right continuous-rotation servo.
//
// The right motor is mounted in the opposite direction to the left motor.
// Because of this, its Servo library value must be reversed.
//
// Subtracting the speed from 90 makes matching positive values
// move both wheels forward.
void setRightMotorSpeed(int speed)
{
  speed = constrain(
    speed,
    MINIMUM_MOTOR_SPEED,
    MAXIMUM_MOTOR_SPEED
  );

  int servoCommand = 90 - speed;

  rightMotorServo.write(servoCommand);
}


// Stop both motors.
void stopBothMotors(void)
{
  setLeftMotorSpeed(LEFT_MOTOR_STOP_SPEED);
  setRightMotorSpeed(RIGHT_MOTOR_STOP_SPEED);
}


// Movement sequence functions

// Reset all movement sequence variables.
//
// This prepares the movement program to start again from
// the first student command.
void resetMovementSequence(void)
{
  currentMovementStep = 0;
  currentMovementCommand = 0;

  movementWaitActive = false;
  movementWaitStartTimeMs = 0;
}


// Start reading the student commands from the first line.
//
// This function is called repeatedly while the motor test is running.
void beginMovementSequence(void)
{
  currentMovementCommand = 0;
}


// Check whether the full movement sequence has finished.
//
// When every student command is complete:
// - The movement sequence is reset.
// - Both motors are stopped.
void endMovementSequence(void)
{
  if (currentMovementCommand <= currentMovementStep)
  {
    resetMovementSequence();
    stopBothMotors();
  }
}


// Run one left motor command.
//
// The command runs only when its command number matches
// the current movement step.
void runLeftMotorCommand(int speed)
{
  if (currentMovementCommand == currentMovementStep)
  {
    setLeftMotorSpeed(speed);

    // Move to the next student command.
    currentMovementStep++;
  }

  // Count this student command.
  currentMovementCommand++;
}


// Run one right motor command.
//
// The command runs only when its command number matches
// the current movement step.
void runRightMotorCommand(int speed)
{
  if (currentMovementCommand == currentMovementStep)
  {
    setRightMotorSpeed(speed);

    // Move to the next student command.
    currentMovementStep++;
  }

  // Count this student command.
  currentMovementCommand++;
}


// Wait without using delay().
//
// delay() would freeze the whole Arduino program.
// millis() allows the button and OLED screen to keep working.
//
// durationMs is the wait time in milliseconds.
void runMovementWaitCommand(unsigned long durationMs)
{
  if (currentMovementCommand == currentMovementStep)
  {
    // Start timing when this wait command is first reached.
    if (!movementWaitActive)
    {
      movementWaitStartTimeMs = millis();
      movementWaitActive = true;
    }

    // Finish the wait after enough time has passed.
    else if (millis() - movementWaitStartTimeMs >= durationMs)
    {
      movementWaitActive = false;

      // Move to the next student command.
      currentMovementStep++;
    }
  }

  // Count this student command.
  currentMovementCommand++;
}


// OLED screen functions

// Draw one or two lines of text in the middle of the OLED screen.
void drawCenteredText(const char *firstLine, const char *secondLine)
{
  // Clear the screen memory before drawing the new screen.
  oledDisplay.clearDisplay();

  oledDisplay.setTextColor(SH110X_WHITE);
  oledDisplay.setTextSize(1);
  oledDisplay.setFont(NULL);

  int16_t textStartX;
  int16_t textStartY;
  uint16_t textWidth;
  uint16_t textHeight;


  // Measure and centre the first line.
  oledDisplay.getTextBounds(
    firstLine,
    0,
    0,
    &textStartX,
    &textStartY,
    &textWidth,
    &textHeight
  );

  int firstLineX =
    (SCREEN_WIDTH - (int)textWidth) / 2;

  oledDisplay.setCursor(firstLineX, 20);
  oledDisplay.print(firstLine);


  // Draw the second line only when it is not empty.
  if (secondLine[0] != '\0')
  {
    oledDisplay.getTextBounds(
      secondLine,
      0,
      0,
      &textStartX,
      &textStartY,
      &textWidth,
      &textHeight
    );

    int secondLineX =
      (SCREEN_WIDTH - (int)textWidth) / 2;

    oledDisplay.setCursor(secondLineX, 40);
    oledDisplay.print(secondLine);
  }


  // Send the completed screen image to the OLED.
  oledDisplay.display();
}


// Draw the correct screen for the current motor test state.
void drawUserInterface(void)
{
  if (motorTestRunning)
  {
    drawCenteredText(
      "Motor Test Running",
      "Press to stop"
    );
  }
  else
  {
    drawCenteredText(
      "Press knob to start"
    );
  }
}


// Button function

// Read and debounce the rotary encoder push button.
//
// Debouncing prevents one physical press from being
// counted several times because of electrical noise.
void updateEncoderButton(void)
{
  bool currentButtonState =
    digitalRead(ENCODER_BUTTON_PIN);

  unsigned long currentTimeMs = millis();


  // Save the time whenever the button changes state.
  if (currentButtonState != previousButtonState)
  {
    lastButtonStateChangeTimeMs = currentTimeMs;
    previousButtonState = currentButtonState;
  }


  // Accept the button state only after it has stayed stable
  // for the debounce time.
  if (
    currentTimeMs - lastButtonStateChangeTimeMs
    > BUTTON_DEBOUNCE_TIME_MS
  )
  {
    // LOW means the button is pressed because INPUT_PULLUP is used.
    if (
      currentButtonState == LOW
      && buttonReadyForPress
    )
    {
      // Start the test when it is currently stopped.
      if (!motorTestRunning)
      {
        resetMovementSequence();
        motorTestRunning = true;
      }

      // Stop the test when it is currently running.
      else
      {
        motorTestRunning = false;

        resetMovementSequence();
        stopBothMotors();
      }

      // Prevent this press from being counted again.
      buttonReadyForPress = false;
    }


    // Allow another press after the button is released.
    if (currentButtonState == HIGH)
    {
      buttonReadyForPress = true;
    }
  }
}


// Setup
//
// setup() runs once when the Arduino starts or resets.
void setup(void)
{
  // Use the Arduino's internal pull-up resistor for the button.
  pinMode(
    ENCODER_BUTTON_PIN,
    INPUT_PULLUP
  );


  // Connect each Servo object to its motor signal pin.
  leftMotorServo.attach(LEFT_MOTOR_PIN);
  rightMotorServo.attach(RIGHT_MOTOR_PIN);


  // Make sure both motors are stopped when the Arduino starts.
  stopBothMotors();


  // Start the OLED screen.
  Wire.begin();

  oledDisplay.begin(
    OLED_I2C_ADDRESS,
    true
  );


  // Clear any random pixels left in the OLED memory.
  oledDisplay.clearDisplay();
  oledDisplay.display();
}


// Main loop
//
// loop() repeats continuously while the Arduino has power.
void loop(void)
{
  // Check whether the encoder button was pressed.
  updateEncoderButton();


  // Run the student motor test while the test is active.
  if (motorTestRunning)
  {
    runStudentMotorTest();
  }


  // Draw the current motor test state on the OLED.
  drawUserInterface();
}
