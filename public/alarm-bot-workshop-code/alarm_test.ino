#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SH110X.h>

void beginSoundSequence();
void endSoundSequence();
void soundWaitCmd(unsigned long durationMs);
void soundPlayToneCmd(int pitch, unsigned long durationMs);

#define playTone(p, sec) soundPlayToneCmd(p, (unsigned long)((sec) * 1000))
#define wait(sec)        soundWaitCmd((unsigned long)((sec) * 1000))

void studentAlarmSound() {
  beginSoundSequence();

  /* =========================================================
     ========= STUDENT ALARM CODE (START HERE) =================
     ========================================================= */


  // type alarm code here


  /* =========================================================
     ========= STUDENT ALARM CODE (END HERE) ===================
     ========================================================= */

  endSoundSequence();
}

#undef playTone
#undef wait

#define SCREEN_WIDTH 128
#define SCREEN_HEIGHT 64
Adafruit_SH1106G display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, -1);

#define ENCODER_BTN 7
#define BUZZER_PIN 8

bool testRunning = false;
bool lastBtn = HIGH;
bool btnArmed = true;
unsigned long lastBtnChangeMs = 0;
const unsigned long debounceMs = 30;

int soundCurrentStep = 0;
int soundLineCounter = 0;
bool soundWaiting = false;
unsigned long soundWaitStartMs = 0;

bool toneActive = false;
unsigned long toneStartMs = 0;

void resetSoundSequence() {
  soundCurrentStep = 0;
  soundLineCounter = 0;
  soundWaiting = false;
  soundWaitStartMs = 0;
  toneActive = false;
  toneStartMs = 0;
  noTone(BUZZER_PIN);
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

void drawCenteredText(const char *line1, const char *line2 = "", const char *line3 = "") {
  display.clearDisplay();
  display.setTextColor(SH110X_WHITE);
  display.setTextSize(1);

  int16_t x1, y1;
  uint16_t w, h;

  display.getTextBounds(line1, 0, 0, &x1, &y1, &w, &h);
  display.setCursor((SCREEN_WIDTH - (int)w) / 2, 16);
  display.print(line1);

  if (line2[0] != '\0') {
    display.getTextBounds(line2, 0, 0, &x1, &y1, &w, &h);
    display.setCursor((SCREEN_WIDTH - (int)w) / 2, 32);
    display.print(line2);
  }

  if (line3[0] != '\0') {
    display.getTextBounds(line3, 0, 0, &x1, &y1, &w, &h);
    display.setCursor((SCREEN_WIDTH - (int)w) / 2, 48);
    display.print(line3);
  }

  display.display();
}

void drawUI() {
  if (testRunning) {
    drawCenteredText("Alarm Test Running", "Press knob to stop");
  } else {
    drawCenteredText("Press knob to start", "alarm sound test");
  }
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
      if (!testRunning) {
        resetSoundSequence();
        testRunning = true;
      } else {
        testRunning = false;
        resetSoundSequence();
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
  pinMode(BUZZER_PIN, OUTPUT);
  noTone(BUZZER_PIN);

  display.begin(0x3C, true);
  display.clearDisplay();
  display.display();
}

void loop() {
  handleButton();

  if (testRunning) {
    studentAlarmSound();
  }

  drawUI();
}