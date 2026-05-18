#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SH110X.h>
#include <Servo.h>

void beginMoveSequence();
void endMoveSequence();
void moveLeftMotorCmd(int speed);
void moveRightMotorCmd(int speed);
void moveWaitCmd(unsigned long durationMs);


#define leftMotor(x)  moveLeftMotorCmd(x)
#define rightMotor(x) moveRightMotorCmd(x)
#define wait(sec)     moveWaitCmd((unsigned long)((sec) * 1000))

void studentMotorTest() {
  beginMoveSequence();

  /* =========================================================
     ========= STUDENT MOVEMENT CODE (START HERE) ============
     ========================================================= */


  // type movement code here


  /* =========================================================
     ========= STUDENT MOVEMENT CODE (END HERE) ==============
     ========================================================= */

  endMoveSequence();
}

#undef leftMotor
#undef rightMotor
#undef wait

#define SCREEN_WIDTH 128
#define SCREEN_HEIGHT 64
Adafruit_SH1106G display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, -1);

#define ENCODER_BTN 7
#define SERVO_L_PIN 9
#define SERVO_R_PIN 10

#define L_STOP 0
#define R_STOP 0

Servo leftMotorServo;
Servo rightMotorServo;

bool testRunning = false;

int moveCurrentStep = 0;
int moveLineCounter = 0;
bool moveWaiting = false;
unsigned long moveWaitStartMs = 0;

bool lastBtn = HIGH;
bool btnArmed = true;
unsigned long lastBtnChangeMs = 0;


void setLeftMotor(int speed) {
  speed = constrain(speed, -90, 90);
  leftMotorServo.write(90 + speed);
}

void setRightMotor(int speed) {
  speed = constrain(speed, -90, 90);
  rightMotorServo.write(90 - speed);
}

void stopMotors() {
  setLeftMotor(L_STOP);
  setRightMotor(R_STOP);
}

void resetMoveSequence() {
  moveCurrentStep = 0;
  moveLineCounter = 0;
  moveWaiting = false;
  moveWaitStartMs = 0;
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

void drawCenteredText(const char *line1, const char *line2 = "") {
  display.clearDisplay();
  display.setTextColor(SH110X_WHITE);
  display.setTextSize(1);

  int16_t x1, y1;
  uint16_t w, h;

  display.getTextBounds(line1, 0, 0, &x1, &y1, &w, &h);
  display.setCursor((SCREEN_WIDTH - (int)w) / 2, 20);
  display.print(line1);

  if (line2[0] != '\0') {
    display.getTextBounds(line2, 0, 0, &x1, &y1, &w, &h);
    display.setCursor((SCREEN_WIDTH - (int)w) / 2, 40);
    display.print(line2);
  }

  display.display();
}

void drawUI() {
  if (testRunning) {
    drawCenteredText("Motor Test Running", "Press to stop");
  } else {
    drawCenteredText("Press knob to start");
  }
}

void handleButton() {
  bool btn = digitalRead(ENCODER_BTN);
  unsigned long now = millis();

  if (btn != lastBtn) {
    lastBtnChangeMs = now;
    lastBtn = btn;
  }

  if ((now - lastBtnChangeMs) > 30) {
    if (btn == LOW && btnArmed) {
      if (!testRunning) {
        resetMoveSequence();
        testRunning = true;
      } else {
        testRunning = false;
        resetMoveSequence();
        stopMotors();
      }
      btnArmed = false;
    }

    if (btn == HIGH) {
      btnArmed = true;
    }
  }
}

void setup() {
  pinMode(ENCODER_BTN, INPUT_PULLUP);

  leftMotorServo.attach(SERVO_L_PIN);
  rightMotorServo.attach(SERVO_R_PIN);
  stopMotors();

  display.begin(0x3C, true);
  display.clearDisplay();
  display.display();
}

void loop() {
  handleButton();

  if (testRunning) {
    studentMotorTest();
  }

  drawUI();
}