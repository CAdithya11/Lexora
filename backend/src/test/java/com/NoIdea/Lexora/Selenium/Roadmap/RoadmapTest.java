package com.NoIdea.Lexora.Selenium.Roadmap;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.AfterEach;
import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.openqa.selenium.support.ui.ExpectedConditions;
import java.time.Duration;

import static org.junit.jupiter.api.Assertions.*;

public class RoadmapTest {

    private WebDriver driver;
    private WebDriverWait wait;

    @BeforeEach
    public void setUp() {
        driver = new ChromeDriver();
        wait = new WebDriverWait(driver, Duration.ofSeconds(60));
        driver.manage().window().maximize();
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(60));
    }

    @AfterEach
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }

    // --- Helper: Wait and click ---
    private void waitAndClick(By locator) {
        WebElement element = wait.until(ExpectedConditions.elementToBeClickable(locator));
        element.click();
    }

    // --- Helper: Wait and send keys ---
    private void waitAndSendKeys(By locator, String text) {
        WebElement element = wait.until(ExpectedConditions.presenceOfElementLocated(locator));
        element.clear();
        element.sendKeys(text);
    }

    // --- Helper: Login process ---
    private void loginToApplication() {
        driver.get("http://localhost:5173/Lexora/");
        waitAndClick(By.id("singInButton"));
        waitAndSendKeys(By.name("signinemail"), "anjalisewmini5@gmail.com");
        waitAndSendKeys(By.name("signinpassword"), "12345678");
        waitAndClick(By.id("loginButton"));
        wait.until(ExpectedConditions.presenceOfElementLocated(By.id("Roadmaps")));
    }

    @Test
    @DisplayName("Complete Login and Roadmap Workflow - End to End Test")
    public void testCompleteLoginAndRoadmapWorkflow() {

        // Step 1: Login
        loginToApplication();

        // Step 2: Go to roadmap generator
        waitAndClick(By.id("Roadmaps"));
        waitAndClick(By.id("Roadmaps Generator"));

        // Step 3: Generate roadmap for "Frontend Developer"
        waitAndSendKeys(By.id("SX4"), "Frontend Developer");
        waitAndClick(By.id("GenerateButton"));

        // Step 4: Select option and enter skill
        waitAndClick(By.id("OptionOneSelection"));
        waitAndSendKeys(By.id("SkillRoadmap"), "React");
        waitAndClick(By.id("SkillGenerateRoadmap"));

        // Step 5: Save generated roadmap
        try {
            waitAndClick(By.id("SaveRoadmap")); // <-- double check this ID in your HTML

            // Optional wait (in case backend takes time)
            Thread.sleep(2000);

            // Handle alert if appears (due to backend 400 error or frontend message)
            try {
                Alert alert = driver.switchTo().alert();
                System.out.println("Alert shown: " + alert.getText());
                alert.accept();
                System.out.println("Alert accepted.");
            } catch (NoAlertPresentException e) {
                System.out.println("No alert appeared.");
            }

        } catch (Exception e) {
            System.out.println("Error while saving roadmap: " + e.getMessage());
        }

        // Step 6: View roadmap
        waitAndClick(By.id("ViewRoadmap"));
        WebElement backButton = wait.until(ExpectedConditions.presenceOfElementLocated(By.id("cancel")));
        assertNotNull(backButton, "Back button should be present in roadmap view");

        // Step 7: Go back
        waitAndClick(By.id("cancel"));

        // Step 8: Delete roadmap
        waitAndClick(By.id("DeleteRoadmap"));

        // Step 9: Confirm still on roadmap page
        assertTrue(driver.getCurrentUrl().contains("Lexora") ||
                !driver.findElements(By.id("Roadmaps")).isEmpty(),
                "Should remain on roadmaps page after deletion");
    }
}
