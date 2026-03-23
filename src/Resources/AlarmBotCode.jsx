import React, { useState } from "react";
import "./AlarmBotCode.css";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckIcon from "@mui/icons-material/Check";
import AlternativeFooter from "../Footer/AlternativeFooter";

const templates = [
  {
    title: "Movement Code",
    description: "Basic Movement Code Template",
    code: `#include <Servo.h>

#define LEFT_MOTOR_PIN 9
#define RIGHT_MOTOR_PIN 10

Servo LeftMotor;
Servo RightMotor;


void alarmMove(){
  // ======== STUDENT MOVEMENT CODE START ========
  
  // INSERT CODE HERE

  // ======== STUDENT MOVEMENT CODE END ==========
}


void setup() {
  LeftMotor.attach(LEFT_MOTOR_PIN);
  RightMotor.attach(RIGHT_MOTOR_PIN);
}

void loop() {
  alarmMove();
}`
  },
  {
    title: "Alarm Code",
    description: "Basic Alarm Code Template",
    code: `#define BUZZER_PIN 8

void playTone(int freq) {
  tone(BUZZER_PIN,freq);
}
void stopTone() {
  noTone(BUZZER_PIN);
}


void alarmSound() {
  // ======== STUDENT ALARM SOUND CODE START =====

  // INSERT CODE HERE

  // ======== STUDENT ALARM SOUND CODE END =======
}


void setup() {
  pinMode(BUZZER_PIN,OUTPUT);
}

void loop() {
  alarmSound();
}`
  },
  {
    title: "Overall Code",
    description: "Overal Code Template",
    code: `#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SH110X.h>
#include <RTClib.h>
#include <Fonts/FreeSansBold12pt7b.h>
#include <Servo.h>

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

#define LEFT_MOTOR_PIN 9
#define RIGHT_MOTOR_PIN 10

Servo LeftMotor;
Servo RightMotor;

void playTone(int freq) {
	tone(BUZZER_PIN, freq);
}

void stopTone() {
	noTone(BUZZER_PIN);
}


void alarmMove(){
  // ======== STUDENT MOVEMENT CODE START ========
  
  // INSERT CODE HERE

  // ======== STUDENT MOVEMENT CODE END ==========
}


void alarmSound(){
  // ======== STUDENT ALARM SOUND CODE START =====
  
  // INSERT CODE HERE

  // ======== STUDENT ALARM SOUND CODE END =======
}


enum Mode { MODE_TIME, MODE_ALARM_TOGGLE,
            MODE_ALARM_H, MODE_ALARM_M };
Mode mode = MODE_TIME;

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

void drawUI(const DateTime &now);
void updateAlarmState(const DateTime &now);

void applyDelta(int d) {
  if (mode == MODE_ALARM_TOGGLE && d) {
    alarmEnabledPending=!alarmEnabledPending;
  } else if (mode == MODE_ALARM_H) {
    alarmH = (alarmH + d + 24) % 24;
  } else if (mode == MODE_ALARM_M) {
    alarmM = (alarmM + d + 60) % 60;
  }
}

void readEncoder() {
  uint8_t ab = (digitalRead(ENCODER_A) << 1) | digitalRead(ENCODER_B);
  int8_t step = QDEC[(oldAB << 2)|ab];
  if (step) {
    accum += step;
    if (abs(accum) >= STEPS_PER_DETENT) {
      applyDelta(accum > 0 ? 1 : -1);
      accum = 0;
    }
  }
  oldAB = ab;
}

void alarmStart() {
  alarmRinging = true;
  alarmLatchedThisMinute = true;
}
void alarmStop() {
  alarmRinging = false;
  stopTone();
  LeftMotor.write(90);
  RightMotor.write(90);
}

void handleButton() {
  bool btn = digitalRead(ENCODER_BTN);
  unsigned long now = millis();

  if (btn != lastBtn) {
    lastBtnChangeMs = now;
    lastBtn = btn;
  }

  if ((now - lastBtnChangeMs) > debounceMs) {
    if (btn == LOW && btnArmed) {
      if (alarmRinging) {
        alarmStop();
        btnArmed = false;
        return;
      }

      if (mode == MODE_TIME) {
        mode = MODE_ALARM_TOGGLE;
        alarmEnabledPending = alarmEnabled;
      } else if (mode == MODE_ALARM_TOGGLE) {
        mode = MODE_ALARM_H;
      } else if (mode == MODE_ALARM_H) {
        mode = MODE_ALARM_M;
      } else {
        mode = MODE_TIME;
        alarmEnabled = alarmEnabledPending;
      }

      btnArmed = false;
    }
    
    if (btn == HIGH) btnArmed = true;
  }
}

void updateAlarmState(const DateTime &now) {
  if (mode !=MODE_TIME) {
    alarmLatchedThisMinute = false;
    return;
  }
  if (!alarmEnabled) {
    alarmLatchedThisMinute = false;
    return;
  }

  if (now.hour() == alarmH && now.minute() == alarmM) {
    if (!alarmLatchedThisMinute && !alarmRinging) alarmStart();
  } else {
    alarmLatchedThisMinute = false;
  }
}

void setup() {
  pinMode(ENCODER_A,INPUT_PULLUP);
  pinMode(ENCODER_B,INPUT_PULLUP);
  pinMode(ENCODER_BTN,INPUT_PULLUP);

  pinMode(BUZZER_PIN,OUTPUT);
  stopTone();

  LeftMotor.attach(LEFT_MOTOR_PIN);
  RightMotor.attach(RIGHT_MOTOR_PIN);

  LeftMotor.write(90);
  RightMotor.write(90);

  display.begin(0x3C, true);
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
    return;
  }
}`
  }
];

function AlarmBotCode() {
  const [copiedIndex, setCopiedIndex] = useState(null);

  const handleCopy = (code, index) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <>
        <div className="code-page">
        <div className="code-header">
            <h1>Code Templates</h1>
            <p>Copy and paste ready-to-use templates for your projects.</p>
        </div>

        <div className="code-grid">
            {templates.map((template, index) => (
            <div className="code-card" key={index}>
                <div className="code-card-header">
                <div>
                    <h2>{template.title}</h2>
                    <p>{template.description}</p>
                </div>

                <button
                    className={`copy-btn ${copiedIndex === index ? "copied" : ""}`}
                    onClick={() => handleCopy(template.code, index)}
                >
                    {copiedIndex === index ? <CheckIcon /> : <ContentCopyIcon />}
                    {copiedIndex === index ? "Copied" : "Copy"}
                </button>
                </div>

                <pre className="code-block">
                <code>{template.code}</code>
                </pre>
            </div>
            ))}
        </div>
        </div>

        <AlternativeFooter />
    </>
  );
}

export default AlarmBotCode
