// Project Beacon Alarm Sound Test
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
}
