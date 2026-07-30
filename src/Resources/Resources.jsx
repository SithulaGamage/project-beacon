import './Resources.css'
import { useState, useEffect } from 'react'
import AlternativeFooter from '../Footer/AlternativeFooter.jsx'

import LockIcon from '@mui/icons-material/Lock'
import DownloadIcon from '@mui/icons-material/Download'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import CheckIcon from '@mui/icons-material/Check'
import SchoolIcon from '@mui/icons-material/School'
import SEO from '../SEO/SEO.jsx'

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
// import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

const schoolAccessCodes = {
  BCH2026: {
    schoolName: 'Bethany College',
    displayName: 'Bethany College students'
  },
  CCC2026: {
    schoolName: 'Caroline Chisholm College',
    displayName: 'Caroline Chisholm College students'
  },
  BEACON2025: {
    schoolName: 'Project Beacon',
    displayName: 'Project Beacon students'
  }
}

/*
  Replace these placeholder code strings with your full Arduino code.
  Keep the same structure: title, description, code.
*/
const templates = [
  {
    title: 'Movement Code',
    fileURL: '/alarm-bot-workshop-code/movement_code.ino',
    fileName: 'movement_code.ino',
    description: 'Basic Movement Code Template',
    code: `// Project Beacon Motor Test
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
}`
  },
  {
    title: 'Alarm Code',
    fileURL: '/alarm-bot-workshop-code/alarm_code.ino',
    fileName: 'alarm_code.ino',
    description: 'Basic Alarm Code Template',
    code: `// Project Beacon Alarm Sound Test
//
// Press the rotary encoder button to start the sound test.
// Press it again to stop the sound test.
//
// Student sound commands:
// playTone(frequency, seconds)
// wait(seconds)
//


// Libraries
#include <Arduino.h>
#include <Wire.h>
#include <Adafruit_GFX.h>      // Adafruit GFX Library by Adafruit
#include <Adafruit_SH110X.h>   // Adafruit SH110X Library by Adafruit


// Pin numbers
#define ENCODER_BUTTON_PIN 7
#define BUZZER_PIN 8


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


// Sound test state
bool soundTestRunning = false;


// Button state
//
// INPUT_PULLUP is used for the encoder button.
// This means:
// HIGH = button released
// LOW  = button pressed
bool previousButtonState = HIGH;
bool buttonReadyForPress = true;

unsigned long lastButtonStateChangeTimeMs = 0;
const unsigned long BUTTON_DEBOUNCE_TIME_MS = 30;


// Sound sequence state
//
// These variables allow sound commands to run one step at a time
// without freezing the rest of the program.
int currentSoundStep = 0;
int currentSoundCommand = 0;

bool soundWaitActive = false;
unsigned long soundWaitStartTimeMs = 0;

bool tonePlaying = false;
unsigned long toneStartTimeMs = 0;


// Function declarations

// Student sound program
void runStudentAlarmSound(void);

// Sound sequence control
void resetSoundSequence(void);
void beginSoundSequence(void);
void endSoundSequence(void);

void runSoundWaitCommand(unsigned long durationMs);
void runToneCommand(int frequencyHz, unsigned long durationMs);

// OLED screen
void drawCenteredText(
  const char *firstLine,
  const char *secondLine = "",
  const char *thirdLine = ""
);

void drawUserInterface(void);

// Button
void updateEncoderButton(void);


// Student sound commands
//
// playTone(frequency, seconds)
// wait(seconds)
#define playTone(frequency, seconds) \
  runToneCommand((frequency), (unsigned long)((seconds) * 1000.0))

#define wait(seconds) \
  runSoundWaitCommand((unsigned long)((seconds) * 1000.0))


// Student alarm sound code
void runStudentAlarmSound(void)
{
  // Reset the command counter before reading the student commands.
  beginSoundSequence();

  // =====================================================
  // ============== STUDENT ALARM CODE START =============
  // =====================================================

  // playTone() uses:
  //
  // First value  = pitch in hertz
  // Second value = length of the tone in seconds
  //
  // wait() uses:
  //
  // Value = silence time in seconds


  // Example: Happy Birthday Alarm
  //
  // Remove the // symbols to use this example.
  //
  // playTone(528, 0.25); wait(0.05);
  // playTone(528, 0.25); wait(0.05);
  // playTone(594, 0.50); wait(0.05);
  // playTone(528, 0.50); wait(0.05);
  // playTone(704, 0.50); wait(0.05);
  // playTone(660, 1.00); wait(0.20);


  // Example: Hogwarts Alarm
  //
  // Remove the // symbols to use this example.
  //
  // playTone(494, 0.35); wait(0.05);
  // playTone(659, 0.50); wait(0.05);
  // playTone(784, 0.25); wait(0.05);
  // playTone(740, 0.25); wait(0.05);
  // playTone(659, 0.50); wait(0.10);
  //
  // playTone(988, 0.35); wait(0.05);
  // playTone(880, 0.75); wait(0.10);
  // playTone(740, 0.75); wait(0.15);
  //
  // playTone(659, 0.35); wait(0.05);
  // playTone(784, 0.25); wait(0.05);
  // playTone(740, 0.25); wait(0.05);
  // playTone(622, 0.50); wait(0.10);
  //
  // playTone(698, 0.35); wait(0.05);
  // playTone(494, 0.75); wait(0.30);


  // Example: Mission Impossible Alarm
  //
  // Remove the // symbols to use this example.
  //
  // playTone(784, 0.15); wait(0.05);
  // playTone(784, 0.15); wait(0.05);
  // playTone(932, 0.15); wait(0.05);
  // playTone(1047, 0.15); wait(0.10);
  //
  // playTone(784, 0.15); wait(0.05);
  // playTone(784, 0.15); wait(0.05);
  // playTone(699, 0.15); wait(0.05);
  // playTone(740, 0.15); wait(0.15);
  //
  // playTone(784, 0.15); wait(0.05);
  // playTone(784, 0.15); wait(0.05);
  // playTone(932, 0.15); wait(0.05);
  // playTone(1047, 0.15); wait(0.10);
  //
  // playTone(784, 0.15); wait(0.05);
  // playTone(784, 0.15); wait(0.05);
  // playTone(699, 0.15); wait(0.05);
  // playTone(740, 0.30); wait(0.25);


  // =====================================================
  // =============== STUDENT ALARM CODE END ==============
  // =====================================================

  // Check whether every student sound command has finished.
  endSoundSequence();
}


// Remove the student command macros outside the student section.
#undef playTone
#undef wait


// Sound sequence functions

// Reset all sound sequence variables.
//
// This prepares the sound program to start again from
// the first student command.
void resetSoundSequence(void)
{
  currentSoundStep = 0;
  currentSoundCommand = 0;

  soundWaitActive = false;
  soundWaitStartTimeMs = 0;

  tonePlaying = false;
  toneStartTimeMs = 0;

  // Make sure the buzzer is silent.
  noTone(BUZZER_PIN);
}


// Start reading the student sound commands from the first line.
//
// This function is called repeatedly while the sound test is running.
void beginSoundSequence(void)
{
  currentSoundCommand = 0;
}


// Check whether the full sound sequence has finished.
//
// When every student command is complete:
// - The sound sequence is reset.
// - The buzzer is turned off.
void endSoundSequence(void)
{
  if (currentSoundCommand <= currentSoundStep)
  {
    resetSoundSequence();
  }
}


// Wait without using delay().
//
// delay() would freeze the whole Arduino program.
// millis() allows the button and OLED screen to keep working.
//
// durationMs is the silence time in milliseconds.
void runSoundWaitCommand(unsigned long durationMs)
{
  if (currentSoundCommand == currentSoundStep)
  {
    // Start timing when this wait command is first reached.
    if (!soundWaitActive)
    {
      noTone(BUZZER_PIN);

      soundWaitStartTimeMs = millis();
      soundWaitActive = true;
    }

    // Finish the wait after enough time has passed.
    else if (millis() - soundWaitStartTimeMs >= durationMs)
    {
      soundWaitActive = false;

      // Move to the next student sound command.
      currentSoundStep++;
    }
  }

  // Count this student sound command.
  currentSoundCommand++;
}


// Play one tone without freezing the rest of the program.
//
// frequencyHz is the pitch of the tone.
// durationMs is the length of the tone in milliseconds.
void runToneCommand(int frequencyHz, unsigned long durationMs)
{
  if (currentSoundCommand == currentSoundStep)
  {
    // Start the tone when this command is first reached.
    if (!tonePlaying)
    {
      tone(BUZZER_PIN, frequencyHz);

      toneStartTimeMs = millis();
      tonePlaying = true;
    }

    // Stop the tone after enough time has passed.
    else if (millis() - toneStartTimeMs >= durationMs)
    {
      noTone(BUZZER_PIN);

      tonePlaying = false;

      // Move to the next student sound command.
      currentSoundStep++;
    }
  }

  // Count this student sound command.
  currentSoundCommand++;
}


// OLED screen functions

// Draw one, two or three centred lines of text.
void drawCenteredText(
  const char *firstLine,
  const char *secondLine,
  const char *thirdLine
)
{
  // Clear the OLED memory before drawing the next screen.
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

  oledDisplay.setCursor(firstLineX, 16);
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

    oledDisplay.setCursor(secondLineX, 32);
    oledDisplay.print(secondLine);
  }


  // Draw the third line only when it is not empty.
  if (thirdLine[0] != '\0')
  {
    oledDisplay.getTextBounds(
      thirdLine,
      0,
      0,
      &textStartX,
      &textStartY,
      &textWidth,
      &textHeight
    );

    int thirdLineX =
      (SCREEN_WIDTH - (int)textWidth) / 2;

    oledDisplay.setCursor(thirdLineX, 48);
    oledDisplay.print(thirdLine);
  }


  // Send the completed screen image to the OLED.
  oledDisplay.display();
}


// Draw the correct screen for the current test state.
void drawUserInterface(void)
{
  if (soundTestRunning)
  {
    drawCenteredText(
      "Alarm Test Running",
      "Press knob to stop"
    );
  }
  else
  {
    drawCenteredText(
      "Press knob to start",
      "alarm sound test"
    );
  }
}


// Button function

// Read and debounce the encoder push button.
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
    // LOW means pressed because INPUT_PULLUP is used.
    if (
      currentButtonState == LOW
      && buttonReadyForPress
    )
    {
      // Start the sound test when it is currently stopped.
      if (!soundTestRunning)
      {
        resetSoundSequence();
        soundTestRunning = true;
      }

      // Stop the sound test when it is currently running.
      else
      {
        soundTestRunning = false;
        resetSoundSequence();
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


  // Set the buzzer pin as an output.
  pinMode(
    BUZZER_PIN,
    OUTPUT
  );


  // Make sure the buzzer is silent when the Arduino starts.
  noTone(BUZZER_PIN);


  // Start the I2C connection used by the OLED.
  Wire.begin();


  // Start the OLED screen.
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


  // Run the student sound program while the test is active.
  if (soundTestRunning)
  {
    runStudentAlarmSound();
  }


  // Draw the current sound test state on the OLED.
  drawUserInterface();
}`
  },
  {
    title: 'Overall Code',
    fileURL: '/alarm-bot-workshop-code/overall_code.ino',
    fileName: 'overall_code.ino',
    description: 'Overall Code Template',
    code: `// Project Beacon Alarm Bot

// Libraries
#include <Arduino.h>
#include <Wire.h>
#include <Adafruit_GFX.h>               // Adafruit GFX Library by Adafruit
#include <Adafruit_SH110X.h>            // Adafruit SH110X by Adafruit
#include <RTClib.h>                     // RTCLib by NeiroN
#include <Fonts/FreeSansBold12pt7b.h>
#include <Servo.h>                      // Servo by Michael Margolis


// Pin numbers
#define ENCODER_A_PIN   5
#define ENCODER_B_PIN   6
#define ENCODER_BUTTON_PIN 7
#define BUZZER_PIN  8
#define LEFT_MOTOR_PIN 9
#define RIGHT_MOTOR_PIN 10

#define RTC_ENABLE_PIN  4
#define RTC_CLOCK_PIN 2
#define RTC_DATA_PIN  3


// OLED screen
#define SCREEN_WIDTH  128
#define SCREEN_HEIGHT 64
Adafruit_SH1106G oledDisplay(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, -1);


// Real-time clock
DS1302 realTimeClock(RTC_ENABLE_PIN, RTC_CLOCK_PIN, RTC_DATA_PIN);


// Motors
Servo leftMotorServo;
Servo rightMotorServo;

#define LEFT_MOTOR_STOP_SPEED 0
#define RIGHT_MOTOR_STOP_SPEED 0


// Program variables

// Alarm settings and state
bool alarmEnabled = false;
bool alarmEnabledPending = false;

int alarmHour = 7;
int alarmMinute = 0;

bool alarmRinging = false;
bool alarmTriggeredThisMinute = false;

// Screen refresh timing
unsigned long lastUiUpdateTimeMs = 0;
const unsigned long UI_UPDATE_INTERVAL_MS = 120;

// Encoder button state
bool previousButtonState = HIGH;
bool buttonReadyForPress = true;
unsigned long lastButtonStateChangeTimeMs = 0;
const unsigned long BUTTON_DEBOUNCE_TIME_MS = 30;

// Rotary encoder state
const int8_t ENCODER_TRANSITION_TABLE[16] = {
   0, -1,  1,  0,
   1,  0,  0, -1,
  -1,  0,  0,  1,
   0,  1, -1,  0
};

uint8_t previousEncoderState = 0;
int encoderStepAccumulator = 0;
// Number of encoder electrical transitions required for one physical click.
const int STEPS_PER_DETENT = 4;

// Battery reading
const float BATTERY_FULL_VOLTAGE  = 5.60;
const float BATTERY_EMPTY_VOLTAGE = 4.40;
// Low-pass filtered supply voltage used to keep the battery icon stable.
float filteredSupplyVoltage = 5.0f;

// Screen editing mode
enum UserInterfaceMode { UI_MODE_TIME, UI_MODE_ALARM_TOGGLE, UI_MODE_ALARM_HOUR, UI_MODE_ALARM_MINUTE };
UserInterfaceMode currentUserInterfaceMode = UI_MODE_TIME;

// Keeps movement commands running one step at a time
int movementCurrentStep = 0;
int movementCommandIndex = 0;
bool movementWaitActive = false;
unsigned long movementWaitStartTimeMs = 0;

// Keeps sound commands running one step at a time
int soundCurrentStep = 0;
int soundCommandIndex = 0;
bool soundWaitActive = false;
unsigned long soundWaitStartTimeMs = 0;
bool toneIsPlaying = false;
unsigned long toneStartTimeMs = 0;


// Function declarations

// Student Alarm Programs
void runAlarmMovementProgram(void);
void runAlarmSoundProgram(void);

// Motor Control
void setLeftMotorSpeed(int speed);
void setRightMotorSpeed(int speed);

// Keeps movement commands running one step at a time
void resetMoveSequence(void);
void beginMovementSequence(void);
void endMovementSequence(void);
void executeLeftMotorCommand(int speed);
void executeRightMotorCommand(int speed);
void executeMovementWaitCommand(unsigned long durationMs);

// Keeps sound commands running one step at a time
void resetSoundSequence(void);
void beginSoundSequence(void);
void endSoundSequence(void);
void executeSoundWaitCommand(unsigned long durationMs);
void executeToneCommand(int pitch, unsigned long durationMs);

// Alarm Control
void resetAlarmPrograms(void);
void startAlarm(void);
void stopAlarm(void);

// Encoder
void updateRotaryEncoder(void);
void applyEncoderChange(int change);

// Battery
long readSupplyVoltageMillivolts(void);
float readFilteredSupplyVoltage(void);
int calculateBatteryPercentage(float voltage);

// User Interface
void drawBatteryIcon(int percent);
void drawUserInterface(const DateTime &currentTime);

// Button
void updateEncoderButton(void);

// Alarm Logic
void updateAlarmTrigger(const DateTime &currentTime);

// Utilities
int wrapInteger(int value, int minimum, int maximum);
int clampInteger(int value, int minimum, int maximum);


// Student movement commands
#define leftMotor(x)  executeLeftMotorCommand(x)
#define rightMotor(x) executeRightMotorCommand(x)
#define wait(sec)     executeMovementWaitCommand((unsigned long)((sec) * 1000))


// Student movement code
void runAlarmMovementProgram(void)
{
  beginMovementSequence();

  // =====================================================
// =========== STUDENT MOVEMENT CODE START =============
// =====================================================

  // COPY AND PASTE MOVEMENT CODE HERE

  // =====================================================
// ============ STUDENT MOVEMENT CODE END ==============
// =====================================================

  endMovementSequence();
}

// Undefine student movement macros
#undef leftMotor
#undef rightMotor
#undef wait


// Student sound commands
#define playTone(p, sec) executeToneCommand(p, (unsigned long)((sec) * 1000))
#define wait(sec)        executeSoundWaitCommand((unsigned long)((sec) * 1000))


// Student sound code
void runAlarmSoundProgram(void)
{
  beginSoundSequence();

  // =====================================================
// ============ STUDENT ALARM CODE START ===============
// =====================================================

  //
// Examples (REMOVE SLASHES):
//
// COPY AND PASTE ALARM CODEH ERE

  // =====================================================
// ============= STUDENT ALARM CODE END ================
// =====================================================

  endSoundSequence();
}

// Undefine student alarm macros
#undef playTone
#undef wait


// Function definitions

// Utility Functions
int wrapInteger(int value, int minimum, int maximum)
{
  int range = maximum - minimum + 1;
  while (value < minimum) value += range;
  while (value > maximum) value -= range;
  return value;
}

int clampInteger(int value, int minimum, int maximum)
{
  return value < minimum ? minimum : (value > maximum ? maximum : value);
}


// Motor Functions

// Convert a speed from -90 to 90 into the servo value used by the left motor.
// Positive values move forward. Negative values move backward.
// This function controls the left motor.
// The student gives a speed from -90 to 90.
// The value is changed into the 0 to 180 range required by the Servo library.
void setLeftMotorSpeed(int speed)
{
  speed = constrain(speed, -90, 90);
  leftMotorServo.write(90 + speed);
}

// The right motor faces the opposite direction to the left motor.
// Subtracting the speed from 90 makes both motors follow the same controls.
// This function controls the right motor.
// The right motor faces the opposite direction, so its value is reversed.
// This lets the same positive speed move both motors forward.
void setRightMotorSpeed(int speed)
{
  speed = constrain(speed, -90, 90);
  rightMotorServo.write(90 - speed);
}


// Movement Sequence Functions
// Start reading the student movement commands from the first line.
// This happens repeatedly while the alarm is active.
void beginMovementSequence(void)
{
  movementCommandIndex = 0;
}

// Check whether every movement command has finished.
// When the sequence ends, both motors are stopped and the sequence is reset.
void endMovementSequence(void)
{
  if (movementCommandIndex <= movementCurrentStep)
  {
    movementCurrentStep = 0;
    movementWaitActive = false;
    setLeftMotorSpeed(LEFT_MOTOR_STOP_SPEED);
    setRightMotorSpeed(RIGHT_MOTOR_STOP_SPEED);
  }
}

// Run one left motor command when it is this command's turn.
void executeLeftMotorCommand(int speed)
{
  if (movementCommandIndex == movementCurrentStep)
  {
    setLeftMotorSpeed(speed);
    movementCurrentStep++;
  }
  movementCommandIndex++;
}

// Run one right motor command when it is this command's turn.
void executeRightMotorCommand(int speed)
{
  if (movementCommandIndex == movementCurrentStep)
  {
    setRightMotorSpeed(speed);
    movementCurrentStep++;
  }
  movementCommandIndex++;
}

// Wait for a set amount of time without using delay().
// millis() allows the screen, clock and button to keep working.
void executeMovementWaitCommand(unsigned long durationMs)
{
  if (movementCommandIndex == movementCurrentStep)
  {
    if (!movementWaitActive)
    {
      movementWaitStartTimeMs = millis();
      movementWaitActive = true;
    }
    else if (millis() - movementWaitStartTimeMs >= durationMs)
    {
      movementWaitActive = false;
      movementCurrentStep++;
    }
  }
  movementCommandIndex++;
}


// Sound Sequence Functions
// Start reading the student sound commands from the first line.
void beginSoundSequence(void)
{
  soundCommandIndex = 0;
}

// Check whether every sound command has finished.
// When finished, the buzzer is turned off and the sound sequence is reset.
void endSoundSequence(void)
{
  if (soundCommandIndex <= soundCurrentStep)
  {
    soundCurrentStep = 0;
    soundWaitActive = false;
    toneIsPlaying = false;
    noTone(BUZZER_PIN);
  }
}

// Pause between sounds without freezing the rest of the program.
void executeSoundWaitCommand(unsigned long durationMs)
{
  if (soundCommandIndex == soundCurrentStep)
  {
    if (!soundWaitActive)
    {
      noTone(BUZZER_PIN);
      soundWaitStartTimeMs = millis();
      soundWaitActive = true;
    }
    else if (millis() - soundWaitStartTimeMs >= durationMs)
    {
      soundWaitActive = false;
      soundCurrentStep++;
    }
  }
  soundCommandIndex++;
}

// Play one tone for the requested amount of time.
// pitch is the frequency in hertz.
// durationMs is the length of the tone in milliseconds.
void executeToneCommand(int pitch, unsigned long durationMs)
{
  if (soundCommandIndex == soundCurrentStep)
  {
    if (!toneIsPlaying)
    {
      tone(BUZZER_PIN, pitch);
      toneStartTimeMs = millis();
      toneIsPlaying = true;
    }
    else if (millis() - toneStartTimeMs >= durationMs)
    {
      noTone(BUZZER_PIN);
      toneIsPlaying = false;
      soundCurrentStep++;
    }
  }
  soundCommandIndex++;
}


// Alarm Control Functions
// Reset both the movement and sound programs.
// This also stops the motors and turns off the buzzer.
void resetAlarmPrograms(void)
{
  movementCurrentStep = 0;
  movementCommandIndex = 0;
  movementWaitActive = false;
  movementWaitStartTimeMs = 0;

  soundCurrentStep = 0;
  soundCommandIndex = 0;
  soundWaitActive = false;
  soundWaitStartTimeMs = 0;

  toneIsPlaying = false;
  toneStartTimeMs = 0;
  noTone(BUZZER_PIN);

  setLeftMotorSpeed(LEFT_MOTOR_STOP_SPEED);
  setRightMotorSpeed(RIGHT_MOTOR_STOP_SPEED);
}

// Start the alarm and prepare the movement and sound sequences.
void startAlarm(void)
{
  alarmRinging = true;
  alarmTriggeredThisMinute = true;
  resetAlarmPrograms();
}

// Stop the alarm immediately.
// This stops the motors, silences the buzzer and resets the sequences.
void stopAlarm(void)
{
  alarmRinging = false;
  noTone(BUZZER_PIN);
  setLeftMotorSpeed(LEFT_MOTOR_STOP_SPEED);
  setRightMotorSpeed(RIGHT_MOTOR_STOP_SPEED);
  resetAlarmPrograms();
}

// Check whether the current clock time matches the saved alarm time.
// The alarm is allowed to start only once during the matching minute.
void updateAlarmTrigger(const DateTime &currentTime)
{
  if (currentUserInterfaceMode != UI_MODE_TIME)
  {
    alarmTriggeredThisMinute = false;
    return;
  }

  if (!alarmEnabled)
  {
    alarmTriggeredThisMinute = false;
    return;
  }

  if (currentTime.hour() == alarmHour && currentTime.minute() == alarmMinute)
  {
    if (!alarmTriggeredThisMinute && !alarmRinging)
    {
      startAlarm();
    }
  }
  else
  {
    alarmTriggeredThisMinute = false;
  }
}


// Battery Functions
// Measure the Arduino supply voltage using the internal voltage reference.
// The result is returned in millivolts.
long readSupplyVoltageMillivolts(void)
{
#if defined(__AVR__)
  ADMUX = _BV(REFS0) | _BV(MUX3) | _BV(MUX2) | _BV(MUX1);
  delayMicroseconds(200);
  ADCSRA |= _BV(ADSC);
  while (bit_is_set(ADCSRA, ADSC));
  return 1125300L / ADC;
#else
  return 5000;
#endif
}

// Smooth the battery reading so the battery icon does not jump around.
float readFilteredSupplyVoltage(void)
{
  float measuredVoltage = readSupplyVoltageMillivolts() / 1000.0f;
  filteredSupplyVoltage = 0.92f * filteredSupplyVoltage + 0.08f * measuredVoltage;
  return filteredSupplyVoltage;
}

// Convert the measured battery voltage into a percentage from 0 to 100.
int calculateBatteryPercentage(float voltage)
{
  int percentage = (int)((voltage - BATTERY_EMPTY_VOLTAGE) * 100.0f / (BATTERY_FULL_VOLTAGE - BATTERY_EMPTY_VOLTAGE) + 0.5f);
  return clampInteger(percentage, 0, 100);
}


// Encoder Functions
// Use one encoder click to change the selected alarm setting.
void applyEncoderChange(int change)
{
  if (currentUserInterfaceMode == UI_MODE_ALARM_TOGGLE && change) alarmEnabledPending = !alarmEnabledPending;
  else if (currentUserInterfaceMode == UI_MODE_ALARM_HOUR)      alarmHour = wrapInteger(alarmHour + change, 0, 23);
  else if (currentUserInterfaceMode == UI_MODE_ALARM_MINUTE)      alarmMinute = wrapInteger(alarmMinute + change, 0, 59);
}

// Read the rotary encoder and work out whether it moved left or right.
void updateRotaryEncoder(void)
{
  // Read both encoder signal pins and combine them into one two-bit value.
  uint8_t currentEncoderState =
    (digitalRead(ENCODER_A_PIN) << 1) |
     digitalRead(ENCODER_B_PIN);

  // Use the previous and current states to find the direction of movement.
  int8_t encoderStep =
    ENCODER_TRANSITION_TABLE[
      (previousEncoderState << 2) | currentEncoderState
    ];

  // Ignore invalid or unchanged encoder states.
  if (encoderStep != 0)
  {
    encoderStepAccumulator += encoderStep;

    // One physical click normally produces four electrical state changes.
    if (abs(encoderStepAccumulator) >= STEPS_PER_DETENT)
    {
      if (encoderStepAccumulator > 0)
      {
        applyEncoderChange(1);
      }
      else
      {
        applyEncoderChange(-1);
      }

      encoderStepAccumulator = 0;
    }
  }

  // Save this state so it can be compared on the next loop.
  previousEncoderState = currentEncoderState;
}


// Button Functions
// Read the encoder push button.
// The debounce check stops one press from being counted more than once.
void updateEncoderButton(void)
{
  // The button uses INPUT_PULLUP, so LOW means pressed and HIGH means released.
  bool currentButtonState = digitalRead(ENCODER_BUTTON_PIN);
  unsigned long currentTimeMs = millis();

  // Record the time whenever the button changes state.
  if (currentButtonState != previousButtonState)
  {
    lastButtonStateChangeTimeMs = currentTimeMs;
    previousButtonState = currentButtonState;
  }

  // Accept the new state only after it has stayed stable for the debounce time.
  if (currentTimeMs - lastButtonStateChangeTimeMs > BUTTON_DEBOUNCE_TIME_MS)
  {
    if (currentButtonState == LOW && buttonReadyForPress)
    {
      // Pressing the button while the alarm is ringing stops the alarm.
      if (alarmRinging)
      {
        stopAlarm();
        buttonReadyForPress = false;
        return;
      }

      // Move to the next alarm-setting screen.
      if (currentUserInterfaceMode == UI_MODE_TIME)
      {
        currentUserInterfaceMode = UI_MODE_ALARM_TOGGLE;
        alarmEnabledPending = alarmEnabled;
      }
      else if (currentUserInterfaceMode == UI_MODE_ALARM_TOGGLE)
      {
        currentUserInterfaceMode = UI_MODE_ALARM_HOUR;
      }
      else if (currentUserInterfaceMode == UI_MODE_ALARM_HOUR)
      {
        currentUserInterfaceMode = UI_MODE_ALARM_MINUTE;
      }
      else
      {
        currentUserInterfaceMode = UI_MODE_TIME;
        alarmEnabled = alarmEnabledPending;
      }

      // Prevent the same press from being counted repeatedly.
      buttonReadyForPress = false;
    }

    // Arm the button again after it has been released.
    if (currentButtonState == HIGH)
    {
      buttonReadyForPress = true;
    }
  }
}


// Display Functions
// Draw the battery outline and fill it based on the percentage.
void drawBatteryIcon(int percent)
{
  // Choose how many of the four battery bars should be filled.
  int filledBars;

  if (percent >= 100)
  {
    filledBars = 4;
  }
  else if (percent >= 75)
  {
    filledBars = 3;
  }
  else if (percent >= 50)
  {
    filledBars = 2;
  }
  else if (percent >= 25)
  {
    filledBars = 1;
  }
  else
  {
    filledBars = 0;
  }

  // Size and position of the battery icon.
  const int iconWidth = 15;
  const int iconHeight = 9;
  const int iconX = SCREEN_WIDTH - iconWidth - 3;
  const int iconY = -1;

  // Draw the battery outline.
  oledDisplay.fillRect(iconX, iconY, iconWidth, 2, SH110X_WHITE);
  oledDisplay.fillRect(
    iconX,
    iconY + iconHeight - 2,
    iconWidth,
    2,
    SH110X_WHITE
  );
  oledDisplay.fillRect(iconX, iconY, 2, iconHeight, SH110X_WHITE);
  oledDisplay.fillRect(
    iconX + iconWidth - 2,
    iconY,
    2,
    iconHeight,
    SH110X_WHITE
  );

  // Draw the small battery terminal on the right side.
  oledDisplay.fillRect(
    iconX + iconWidth,
    iconY + 3,
    2,
    3,
    SH110X_WHITE
  );

  // Draw the filled bars inside the battery.
  for (int barNumber = 0; barNumber < filledBars; barNumber++)
  {
    oledDisplay.fillRect(
      iconX + 3 + barNumber * 3,
      iconY + 3,
      2,
      iconHeight - 6,
      SH110X_WHITE
    );
  }
}

// Draw the date, current time, battery icon and alarm settings.
// Everything is first drawn into memory and then sent to the OLED screen.
void drawUserInterface(const DateTime &currentTime)
{
  oledDisplay.clearDisplay();
  oledDisplay.setTextColor(SH110X_WHITE);
  oledDisplay.setFont(NULL);
  oledDisplay.setTextSize(1);

  // Date
  char dateBuf[11];
  snprintf(dateBuf, sizeof(dateBuf), "%02d/%02d/%04d", currentTime.day(), currentTime.month(), currentTime.year());
  oledDisplay.setCursor(0, 0);
  oledDisplay.print(dateBuf);

  drawBatteryIcon(calculateBatteryPercentage(readFilteredSupplyVoltage()));

  // Time (12h)
  int h24 = currentTime.hour();
  bool pm = h24 >= 12;
  int h12 = h24 % 12;
  if (h12 == 0) h12 = 12;

  char timeBuf[10];
  snprintf(timeBuf, sizeof(timeBuf), "%d:%02d %s", h12, currentTime.minute(), pm ? "PM" : "AM");

  oledDisplay.setFont(&FreeSansBold12pt7b);
  int16_t x1, y1;
  uint16_t tw, th;
  oledDisplay.getTextBounds(timeBuf, 0, 0, &x1, &y1, &tw, &th);
  oledDisplay.setCursor((SCREEN_WIDTH - (int)tw) / 2, (SCREEN_HEIGHT - (int)th) / 2 - y1);
  oledDisplay.print(timeBuf);

  oledDisplay.setFont(NULL);
  oledDisplay.setTextSize(1);

  // Alarm Status Row
  bool showEnabled = (currentUserInterfaceMode == UI_MODE_TIME) ? alarmEnabled : alarmEnabledPending;

  int ah24 = alarmHour;
  bool apm = ah24 >= 12;
  int ah12 = ah24 % 12;
  if (ah12 == 0) ah12 = 12;

  char stateBuf[12];
  snprintf(stateBuf, sizeof(stateBuf), "%s", showEnabled ? "ALARM ON" : "ALARM OFF");

  char alarmTimeBuf[10];
  snprintf(alarmTimeBuf, sizeof(alarmTimeBuf), "%d:%02d %s", ah12, alarmMinute, apm ? "PM" : "AM");

  const char *sep = " - ";

  uint16_t sw, sepw, aw;
  oledDisplay.getTextBounds(stateBuf,    0, 0, &x1, &y1, &sw,   &th);
  oledDisplay.getTextBounds(sep,         0, 0, &x1, &y1, &sepw, &th);
  oledDisplay.getTextBounds(alarmTimeBuf,0, 0, &x1, &y1, &aw,   &th);

  int totalW = (int)sw + (int)sepw + (int)aw;
  int ax = (SCREEN_WIDTH - totalW) / 2;
  int ay = 56;

  oledDisplay.setCursor(ax, ay);
  oledDisplay.print(stateBuf);
  oledDisplay.print(sep);
  oledDisplay.print(alarmTimeBuf);

  // Underline active edit field
  int uy = ay + 7;

  if (currentUserInterfaceMode == UI_MODE_ALARM_TOGGLE)
  {
    oledDisplay.drawLine(ax, uy, ax + (int)sw, uy, SH110X_WHITE);
  }
  else if (currentUserInterfaceMode == UI_MODE_ALARM_HOUR)
  {
    char hb[3];
    snprintf(hb, sizeof(hb), "%d", ah12);
    uint16_t hw;
    oledDisplay.getTextBounds(hb, 0, 0, &x1, &y1, &hw, &th);
    int hx = ax + (int)sw + (int)sepw;
    oledDisplay.drawLine(hx, uy, hx + (int)hw, uy, SH110X_WHITE);
  }
  else if (currentUserInterfaceMode == UI_MODE_ALARM_MINUTE)
  {
    uint16_t hw, cw, mw;
    char hb[3];
    snprintf(hb, sizeof(hb), "%d", ah12);
    oledDisplay.getTextBounds(hb,  0, 0, &x1, &y1, &hw, &th);
    oledDisplay.getTextBounds(":", 0, 0, &x1, &y1, &cw, &th);
    oledDisplay.getTextBounds("00",0, 0, &x1, &y1, &mw, &th);
    int mx = ax + (int)sw + (int)sepw + (int)hw + (int)cw;
    oledDisplay.drawLine(mx, uy, mx + (int)mw, uy, SH110X_WHITE);
  }

  oledDisplay.display();
}


// Setup
// setup() runs once when the Arduino starts or resets.
void setup(void)
{
  // Use the Arduino's built-in pull-up resistors for the encoder pins.
  pinMode(ENCODER_A_PIN, INPUT_PULLUP);
  pinMode(ENCODER_B_PIN, INPUT_PULLUP);
  pinMode(ENCODER_BUTTON_PIN, INPUT_PULLUP);

  pinMode(BUZZER_PIN, OUTPUT);
  noTone(BUZZER_PIN);

  // Connect each Servo object to its Arduino signal pin.
  leftMotorServo.attach(LEFT_MOTOR_PIN);
  rightMotorServo.attach(RIGHT_MOTOR_PIN);
  setLeftMotorSpeed(LEFT_MOTOR_STOP_SPEED);
  setRightMotorSpeed(RIGHT_MOTOR_STOP_SPEED);

  // Start the OLED at I2C address 0x3C.
  // Clear any random pixels left in the screen memory.
  oledDisplay.begin(0x3C, true);
  oledDisplay.clearDisplay();
  oledDisplay.display();

  // Start the real-time clock.
  realTimeClock.begin();

  // Read the saved clock time and compare it with the program compile time.
  DateTime rtcTime = realTimeClock.now();
  DateTime compileTime = DateTime(F(__DATE__), F(__TIME__));

  if (!realTimeClock.isrunning() || compileTime.unixtime() > rtcTime.unixtime() + 10)
  {
    realTimeClock.adjust(compileTime);
  }

  previousEncoderState = (digitalRead(ENCODER_A_PIN) << 1) | digitalRead(ENCODER_B_PIN);
}


// Main loop
// loop() repeats for as long as the Arduino has power.
void loop(void)
{
  // Check for encoder movement and button presses.
  updateRotaryEncoder();
  updateEncoderButton();

  DateTime currentTime = realTimeClock.now();
  updateAlarmTrigger(currentTime);

  // Run the student's movement and sound programs while the alarm is active.
  if (alarmRinging)
  {
    runAlarmMovementProgram();
    runAlarmSoundProgram();
  }

  // Refresh the OLED only at the chosen interval.
  // This avoids redrawing it thousands of times per second.
  if (millis() - lastUiUpdateTimeMs >= UI_UPDATE_INTERVAL_MS)
  {
    drawUserInterface(currentTime);
    lastUiUpdateTimeMs = millis();
  }
}`
  }
]

function Resources() {
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [accessCode, setAccessCode] = useState('')
  const [school, setSchool] = useState(null)
  const [error, setError] = useState(false)
  const [copiedIndex, setCopiedIndex] = useState(null)
  const [expandedCodeIndex, setExpandedCodeIndex] = useState(null)

  useEffect(() => {
    const savedSchool = sessionStorage.getItem('resourcesSchool')

    if (savedSchool) {
      try {
        setSchool(JSON.parse(savedSchool))
        setIsUnlocked(true)
      } catch {
        sessionStorage.removeItem('resourcesSchool')
      }
    }
  }, [])

  const handleUnlock = () => {
    const normalisedCode = accessCode.trim().toUpperCase()
    const matchedSchool = schoolAccessCodes[normalisedCode]

    if (matchedSchool) {
      setSchool(matchedSchool)
      setIsUnlocked(true)
      sessionStorage.setItem('resourcesSchool', JSON.stringify(matchedSchool))
      setError(false)
    } else {
      setError(true)
      setTimeout(() => setError(false), 2000)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleUnlock()
  }

  const handleToggleCode = (index) => {
    setExpandedCodeIndex(expandedCodeIndex === index ? null : index)
  }

  const handleCopy = async (code, index) => {
    try {
      await navigator.clipboard.writeText(code)
      setCopiedIndex(index)
      setTimeout(() => setCopiedIndex(null), 2000)
    } catch {
      console.error('Copy failed')
    }
  }

  if (!isUnlocked) {
    return (
      <>
        <SEO
          title="Student Resources | Project Beacon"
          description="Protected Project Beacon student resources for school robotics incursions, including Arduino code templates, manuals, and workshop materials."
        />

        <div className="resources-container locked">
          <div className="resources-header">
            <h1 className="resources-title">Student Resources</h1>
          </div>

          <div className="resources-locked-card">
            <div className="resources-locked-icon">
              <LockIcon />
            </div>

            <div className="resources-locked-title">
              Protected Student Resources
            </div>

            <p className="resources-locked-description">
              These resources are available to students from registered schools.
              Please enter the access code provided by your teacher.
            </p>

            <div className="resources-access-code-section">
              <label className="resources-access-code-label">
                School Access Code
              </label>

              <input
                type="text"
                className={`resources-access-code-input ${error ? 'error' : ''}`}
                placeholder="Enter your access code"
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value)}
                onKeyDown={handleKeyPress}
              />

              <button
                className="resources-unlock-button"
                onClick={handleUnlock}
              >
                Unlock Student Resources
              </button>

              {error && (
                <p className="resources-error-message">
                  Invalid access code. Please check the code provided by your teacher.
                </p>
              )}
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <SEO
        title={`${school?.schoolName || 'School'} Student Resources | Project Beacon`}
        description={`Project Beacon student resources for ${school?.schoolName || 'registered schools'}, including Arduino code templates, robotics incursion materials, and student manuals.`}
      />

      <div className="resources-container unlocked">
        <div className="resources-student-welcome">
          <div className="resources-welcome-icon">
            <SchoolIcon />
          </div>

          <p className="resources-welcome-label">Welcome</p>

          <h1 className="resources-title">
            Welcome Students from
            <br />
            <span>{school?.schoolName || 'your school'}</span>
          </h1>

          <p className="resources-subtitle">
            Access your robotics incursion resources below, including the student
            manual, Arduino code templates, and downloadable project files.
          </p>
        </div>

        <section className="student-code-section resources-files-section">
          <div className="student-code-header">
            <p className="student-code-label">Student Resources</p>

            <h2>Incursion Materials</h2>

            <p>
              Download the student manual and supporting materials for your
              Project Beacon robotics incursion.
            </p>
          </div>

          <div className="student-code-grid">
            <div className="student-code-card resource-download-card">
              <div className="student-code-card-topbar">
                <div>
                  <div className="student-code-card-label">
                    PDF Resource
                  </div>

                  <h3>Alarm Bot Manual</h3>

                  <p>
                    Step-by-step student guide with assembly instructions,
                    diagrams, safety information, and workshop support material.
                  </p>
                </div>

                <div className="student-code-actions">
                  <a
                    href="/alarm-bot-workshop/Alarm Bot Workshop Manual - Project Beacon.pdf"
                    className="student-code-download-btn resource-download-btn"
                    download
                  >
                    <DownloadIcon />
                    Download PDF
                  </a>
                </div>
              </div>

              <div className="resource-preview-block">
                <div className="resource-preview-icon">
                  <MenuBookIcon />
                </div>

                <div>
                  <p className="resource-preview-label">Student Build Manual</p>

                  <h4>Use this during the session</h4>

                  <p>
                    Follow the build process, understand each component, and
                    complete the robotics activity with the manual open beside you.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="student-code-grid">
            <div className="student-code-card resource-download-card">
              <div className="student-code-card-topbar">
                <div>
                  <div className="student-code-card-label">
                    PDF Resource
                  </div>

                  <h3>Diagnosing Connection Issues with the Arduino Nano</h3>

                  <p>
                    Instructions on how to solve/debug any Arduino Nano connection issues with your computer.
                  </p>
                </div>

                <div className="student-code-actions">
                  <a
                    href="alarm-bot-workshop/Diagnosing Connection Issues with the Arduino Nano - Project Beacon.pdf"
                    className="student-code-download-btn resource-download-btn"
                    download
                  >
                    <DownloadIcon />
                    Download PDF
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="student-code-section">
          <div className="student-code-header">
            <p className="student-code-label">Arduino Templates</p>

            <h2>Student Code Blocks</h2>

            <p>
              Use these Arduino code templates during the Alarm Bot robotics
              incursion. Open the code block when needed, then copy or download it
              as an Arduino .ino file.
            </p>
          </div>

          <div className="student-code-grid">
            {templates.map((template, index) => (
              <div className="student-code-card" key={index}>
                <div className="student-code-card-topbar">
                  <div>
                    <div className="student-code-card-label">
                      Arduino Template
                    </div>

                    <h3>{template.title}</h3>

                    <p>{template.description}</p>
                  </div>

                  <div className="student-code-actions">
                    <button
                      className="student-code-toggle-btn"
                      onClick={() => handleToggleCode(index)}
                    >
                      {expandedCodeIndex === index ? 'Hide Code' : 'Open Code'}
                    </button>

                    <button
                      className={`student-code-copy-btn ${copiedIndex === index ? 'copied' : ''}`}
                      onClick={() => handleCopy(template.code, index)}
                    >
                      {copiedIndex === index ? <CheckIcon /> : <ContentCopyIcon />}
                      {copiedIndex === index ? 'Copied' : 'Copy'}
                    </button>

                    <a
                      href={template.fileURL}
                      download
                      // download={template.fileName}
                      className="student-code-download-btn"
                    >
                      <DownloadIcon />
                      Download
                    </a>
                  </div>
                </div>

                {expandedCodeIndex === index && (
                  <div className="student-code-block">
                    <SyntaxHighlighter
                      language="cpp"
                      style={oneDark}
                      showLineNumbers={true}
                      wrapLongLines={false}
                      customStyle={{
                        margin: 0,
                        padding: '28px',
                        background: 'transparent',
                        fontSize: '13.5px',
                        lineHeight: '1.65',
                        fontFamily:
                          '"Fira Code", "SFMono-Regular", Consolas, "Liberation Mono", monospace'
                      }}
                      codeTagProps={{
                        style: {
                          fontFamily:
                            '"Fira Code", "SFMono-Regular", Consolas, "Liberation Mono", monospace'
                        }
                      }}
                    >
                      {template.code}
                    </SyntaxHighlighter>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>

      <AlternativeFooter />
    </>
  )
}

export default Resources