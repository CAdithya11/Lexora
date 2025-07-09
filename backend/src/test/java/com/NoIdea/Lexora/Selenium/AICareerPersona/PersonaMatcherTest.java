package com.NoIdea.Lexora.Selenium.AICareerPersona;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.apache.commons.io.FileUtils;
import org.junit.jupiter.api.*;
import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.*;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.time.Duration;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
@Tag("selenium")
public class PersonaMatcherTest {

    private WebDriver driver;
    private WebDriverWait wait;
    private Path tempProfileDir;

    @BeforeEach
    public void setUp() throws IOException {
        WebDriverManager.chromedriver().setup();

        ChromeOptions options = new ChromeOptions();
        tempProfileDir = Files.createTempDirectory("chrome-profile-" + UUID.randomUUID());
        options.addArguments("--user-data-dir=" + tempProfileDir.toAbsolutePath());
        options.addArguments("--incognito");
        options.addArguments("--disable-save-password-bubble");
        options.addArguments("--disable-notifications");
        options.addArguments("--disable-blink-features=AutomationControlled");

        driver = new ChromeDriver(options);
        driver.manage().window().maximize();
        wait = new WebDriverWait(driver, Duration.ofSeconds(30));
        driver.get("http://localhost:5173/Lexora/");
    }

    @AfterEach
    public void tearDown() throws IOException {
        if (driver != null) {
            driver.quit();
        }
        FileUtils.deleteDirectory(tempProfileDir.toFile());
    }

    private void waitAndClick(By locator) {
        WebElement element = wait.until(ExpectedConditions.elementToBeClickable(locator));
        element.click();
    }

    private void waitAndSendKeys(By locator, String value) {
        WebElement element = wait.until(ExpectedConditions.presenceOfElementLocated(locator));
        element.clear();
        element.sendKeys(value);
    }

    private void loginToApplication() {
        waitAndClick(By.id("singInButton"));
        waitAndSendKeys(By.name("signinemail"), "abc@gmail.com");
        waitAndSendKeys(By.name("signinpassword"), "00000000");
        waitAndClick(By.xpath("//button[text()='Log in']"));
    }

    private void uploadAndMatchPersona() {
        waitAndClick(By.xpath("//div[contains(., 'Upload CV or Certificates')]"));

        WebElement fileInput = wait.until(ExpectedConditions.presenceOfElementLocated(By.id("uploadInput")));
        fileInput.sendKeys("C:\\Users\\cadit\\Downloads\\N.M.Bishar CV.pdf");

        WebElement matchButton = wait.until(ExpectedConditions.elementToBeClickable(
                By.xpath("//button[contains(text(), 'Match persona') and not(@disabled)]")));
        matchButton.click();

        wait.until(ExpectedConditions.presenceOfElementLocated(
                By.xpath("//td[contains(text(), '1')]/following-sibling::td")));

        WebElement saveButton = wait.until(ExpectedConditions.elementToBeClickable(
                By.xpath("//button[contains(text(), 'Save')]")));
        saveButton.click();

        wait.until(ExpectedConditions.alertIsPresent());
        driver.switchTo().alert().accept();
    }

    @Test
    @DisplayName("Persona Matcher Workflow Test")
    public void testPersonaMatcherWorkflow() {
        // Step 1: Login
        loginToApplication();

        // Step 2: Navigate to Persona Matcher > Persona
        waitAndClick(By.xpath("//span[contains(text(), 'Persona Matcher')]"));
        waitAndClick(By.xpath("//span[text()='Persona']"));

        // Step 3: Upload and Match
        uploadAndMatchPersona();

        // Step 4: Update persona
        waitAndClick(By.xpath("//button[contains(text(), 'Update')]"));
        uploadAndMatchPersona();

        // Step 5: Delete persona
        waitAndClick(By.xpath("//button[contains(text(), 'Delete')]"));
        wait.until(ExpectedConditions.alertIsPresent());
        driver.switchTo().alert().accept();

        // Final assertion: Ensure still on Lexora
        assertTrue(driver.getCurrentUrl().contains("Lexora"),
                "User should still be on the Lexora platform.");
    }
}
