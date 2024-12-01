// Define LCD ports
sbit LCD_RS at LATD4_bit;
sbit LCD_EN at LATD5_bit;
sbit LCD_D4 at LATD0_bit;
sbit LCD_D5 at LATD1_bit;
sbit LCD_D6 at LATD2_bit;
sbit LCD_D7 at LATD3_bit;

sbit LCD_RS_Direction at TRISD4_bit;
sbit LCD_EN_Direction at TRISD5_bit;
sbit LCD_D4_Direction at TRISD0_bit;
sbit LCD_D5_Direction at TRISD1_bit;
sbit LCD_D6_Direction at TRISD2_bit;
sbit LCD_D7_Direction at TRISD3_bit;

// Define ultrasonic sensor bits
sbit TRIG at LATB0_bit;
sbit ECHO at RB1_bit;

// Initialize the USART module
void InitUART(){
    UART1_Init(9600);
    Delay_ms(100);
}

// Initialize the ultrasonic sensor
void InitSensor(){
    TRISB.B0 = 0;  // Set TRIG as output
    TRISB.B1 = 1;  // Set ECHO as input
}

void InitLED(){
    TRISB4_bit = 0;
    TRISB5_bit = 0;
    TRISB6_bit = 0;
}

unsigned char text[15];
char gps_data[100];
char distance_data[15];
char input;

void main() {
    // Ultrasonic sensor time and distance
    unsigned int distance;
    unsigned int time;

    // Initialize LCD
    Lcd_Init();
    Lcd_Cmd(_LCD_CLEAR);
    Lcd_Cmd(_LCD_CURSOR_OFF);

    // Display initial message on LCD
    Lcd_Out(1, 1, "Distance:");

    // Initialize UART, sensor, and LEDs
    InitUART();
    InitSensor();
    InitLED();

    while(1){
        // Ultrasonic Sensor: Measure Distance
        TRIG = 1;
        Delay_us(10);
        TRIG = 0;

        while(!ECHO);  // Wait for ECHO pin to go HIGH
        TMR1H = 0;
        TMR1L = 0;
        T1CON.TMR1ON = 1;  // Start timer 1

        while(ECHO);  // Wait for ECHO pin to go LOW
        T1CON.TMR1ON = 0;  // Stop timer 1

        time = (TMR1H << 8) | TMR1L;
        distance = (time * 0.0343) / 2;

        // Display distance on the LCD
        IntToStr(distance, text);
        Lcd_Out(2, 1, text);
        Lcd_Out(2, 10, "cm");

        // LED indication based on distance
        if (distance < 10) {
            LATB6_bit = 1;  // Turn on Red LED
            LATB5_bit = 0;
            LATB4_bit = 0;
        } else if (distance < 20) {
            LATB6_bit = 0;
            LATB5_bit = 1;  // Turn on Orange LED
            LATB4_bit = 0;
        } else {
            LATB6_bit = 0;
            LATB5_bit = 0;
            LATB4_bit = 1;  // Turn on Green LED
        }

        // Prepare and send distance data over UART
        IntToStr(distance, distance_data);
        UART1_Write_Text("Distance: ");
        UART1_Write_Text(distance_data);
        UART1_Write_Text(" cm\r\n");

        // GPS: Read and Process Data
        if (UART1_Data_Ready()) {
            input = UART1_Read();  // Read data from GPS

            // Assuming the GPS sends data in a structured format (e.g., NMEA sentences)
            // You might want to store the incoming GPS data in a buffer and parse it
            // Here, we'll just display the incoming data for simplicity
            UART1_Write_Text("GPS Data: ");
            UART1_Write(input);
            UART1_Write_Text("\r\n");
        }

        Delay_ms(500);  // Delay for stability
    }
}
