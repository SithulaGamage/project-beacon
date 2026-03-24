#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SH110X.h>
#include <RTClib.h>
#include <Fonts/FreeSansBold12pt7b.h>
#include <Servo.h>

void beginMoveSequence();
void endMoveSequence();
void moveLeftMotorCmd(int speed);
void moveRightMotorCmd(int speed);
void moveWaitCmd(unsigned long durationMs);

void beginSoundSequence();
void endSoundSequence();
void soundWaitCmd(unsigned long durationMs);
void soundPlayToneCmd(int pitch, unsigned long durationMs);

#define leftMotor(x)  moveLeftMotorCmd(x)
#define rightMotor(x) moveRightMotorCmd(x)
#define wait(sec)     moveWaitCmd((unsigned long)((sec) * 1000))

void alarmMove() {
  beginMoveSequence();

  /* =========================================================
     ========= STUDENT MOVEMENT CODE (START HERE) ============
     ========================================================= */


    // paste movement code here



  /* =========================================================
     ========= STUDENT MOVEMENT CODE (END HERE) ==============
     ========================================================= */

  endMoveSequence();
}

#undef leftMotor
#undef rightMotor
#undef wait
#define playTone(p, sec) soundPlayToneCmd(p, (unsigned long)((sec) * 1000))
#define wait(sec)        soundWaitCmd((unsigned long)((sec) * 1000))

void alarmSound() {
  beginSoundSequence();

  /* =========================================================
     ========= STUDENT ALARM CODE (START HERE) ===============
     ========================================================= */
    

    // paste alarm code here


  /* =========================================================
     ========= STUDENT ALARM CODE (END HERE) =================
     ========================================================= */

  endSoundSequence();
}

#undef playTone
#undef wait

#define SCREEN_WIDTH 128
#define SCREEN_HEIGHT 64
Adafruit_SH1106G display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, -1);

#define RTC_CE  4
#define RTC_SCK 2
#define RTC_IO  3
DS1302 rtc(RTC_CE, RTC_SCK, RTC_IO);

#define ENCODER_A   5
#define ENCODER_B   6
#define ENCODER_BTN 7

#define BUZZER_PIN 8
#define SERVO_L_PIN 9
#define SERVO_R_PIN 10

Servo leftMotorServo;
Servo rightMotorServo;

#define L_STOP 0
#define R_STOP 0

bool alarmEnabled = false;
bool alarmEnabledPending = false;

int alarmH = 7;
int alarmM = 0;

bool alarmRinging = false;
bool alarmLatchedThisMinute = false;

unsigned long lastUiMs = 0;
const unsigned long uiPeriodMs = 120;

bool lastBtn = HIGH;
unsigned long lastBtnChangeMs = 0;
const unsigned long debounceMs = 30;
bool btnArmed = true;
const int8_t QDEC[16] = {
  0,-1,1,0,
  1,0,0,-1,
 -1,0,0,1,
  0,1,-1,0
};

uint8_t oldAB = 0;
int accum = 0;
const int STEPS_PER_DETENT = 4;

const float BAT_V_FULL = 5.60;
const float BAT_V_EMPTY = 4.40;
float vccFilt = 5.0f;

enum Mode { MODE_TIME, MODE_ALARM_TOGGLE, MODE_ALARM_H, MODE_ALARM_M };
Mode mode = MODE_TIME;

int moveCurrentStep = 0;
int moveLineCounter = 0;
bool moveWaiting = false;
unsigned long moveWaitStartMs = 0;

int soundCurrentStep = 0;
int soundLineCounter = 0;
bool soundWaiting = false;
unsigned long soundWaitStartMs = 0;

bool toneActive = false;
unsigned long toneStartMs = 0;

void setLeftMotor(int speed) {
  speed = constrain(speed, -90, 90);
  leftMotorServo.write(90 + speed);
}

void setRightMotor(int speed) {
  speed = constrain(speed, -90, 90);
  rightMotorServo.write(90 - speed);
}

void stopMotors() {
  setLeftMotor(0);
  setRightMotor(0);
}

void beginMoveSequence() {
  moveLineCounter = 0;
}

void endMoveSequence() {
  if (moveLineCounter <= moveCurrentStep) {
    moveCurrentStep = 0;
    moveWaiting = false;
    stopMotors();
  }
}

void moveLeftMotorCmd(int speed) {
  if (moveLineCounter == moveCurrentStep) {
    setLeftMotor(speed);
    moveCurrentStep++;
  }
  moveLineCounter++;
}

void moveRightMotorCmd(int speed) {
  if (moveLineCounter == moveCurrentStep) {
    setRightMotor(speed);
    moveCurrentStep++;
  }
  moveLineCounter++;
}

void moveWaitCmd(unsigned long durationMs) {
  if (moveLineCounter == moveCurrentStep) {
    if (!moveWaiting) {
      moveWaitStartMs = millis();
      moveWaiting = true;
    } else if (millis() - moveWaitStartMs >= durationMs) {
      moveWaiting = false;
      moveCurrentStep++;
    }
  }
  moveLineCounter++;
}

void beginSoundSequence() {
  soundLineCounter = 0;
}

void endSoundSequence() {
  if (soundLineCounter <= soundCurrentStep) {
    soundCurrentStep = 0;
    soundWaiting = false;
    toneActive = false;
    noTone(BUZZER_PIN);
  }
}

void soundWaitCmd(unsigned long durationMs) {
  if (soundLineCounter == soundCurrentStep) {
    if (!soundWaiting) {
      noTone(BUZZER_PIN);
      soundWaitStartMs = millis();
      soundWaiting = true;
    } else if (millis() - soundWaitStartMs >= durationMs) {
      soundWaiting = false;
      soundCurrentStep++;
    }
  }
  soundLineCounter++;
}

void soundPlayToneCmd(int pitch, unsigned long durationMs) {
  if (soundLineCounter == soundCurrentStep) {
    if (!toneActive) {
      tone(BUZZER_PIN, pitch);
      toneStartMs = millis();
      toneActive = true;
    } else if (millis() - toneStartMs >= durationMs) {
      noTone(BUZZER_PIN);
      toneActive = false;
      soundCurrentStep++;
    }
  }
  soundLineCounter++;
}

int wrap(int v, int lo, int hi) {
  int r = hi - lo + 1;
  while (v < lo) v += r;
  while (v > hi) v -= r;
  return v;
}

int clampi(int v, int lo, int hi) {
  return v < lo ? lo : (v > hi ? hi : v);
}

void setup() {
  pinMode(ENCODER_A, INPUT_PULLUP);
  pinMode(ENCODER_B, INPUT_PULLUP);
  pinMode(ENCODER_BTN, INPUT_PULLUP);

  pinMode(BUZZER_PIN, OUTPUT);
  noTone(BUZZER_PIN);

  leftMotorServo.attach(SERVO_L_PIN);
  rightMotorServo.attach(SERVO_R_PIN);
  stopMotors();

  display.begin(0x3C, true);
  display.clearDisplay();
  display.display();

  rtc.begin();

  oldAB = (digitalRead(ENCODER_A) << 1) | digitalRead(ENCODER_B);
}

void loop() {
  readEncoder();
  handleButton();

  DateTime now = rtc.now();
  updateAlarmState(now);

  if (alarmRinging) {
    alarmMove();
    alarmSound();
  }

  if (millis() - lastUiMs >= uiPeriodMs) {
    drawUI(now);
    lastUiMs = millis();
  }
}