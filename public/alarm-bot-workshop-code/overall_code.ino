// Project Beacon Alarm Bot

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

  // COPY AND PASTE ALARM CODE HERE

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
}
