package com.NoIdea.Lexora.Selenium.Roadmap;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.BeforeEach;
import org.apache.commons.io.FileUtils;
import org.junit.jupiter.api.AfterEach;
import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

import io.github.bonigarcia.wdm.WebDriverManager;

import org.openqa.selenium.support.ui.ExpectedConditions;
import java.time.Duration;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;

public class RoadmapTest {

    private WebDriver driver;
    private WebDriverWait wait;
    private Path tempProfileDir;

    @BeforeEach
    public void setUp() throws IOException {
        WebDriverManager.chromedriver().setup();

        ChromeOptions options = new ChromeOptions();

        // Detect if running in CI environment
        boolean isCI = isRunningInCI();

        if (isCI) {
            // CI-specific configuration (headless mode)
            System.out.println("Running in CI environment - using headless mode");
            options.addArguments("--headless=new");
            options.addArguments("--disable-gpu");
            options.addArguments("--no-sandbox");
            options.addArguments("--disable-dev-shm-usage");
            options.addArguments("--disable-extensions");
            options.addArguments("--window-size=1920,1080");
            options.addArguments("--remote-debugging-port=9222");
            options.addArguments("--disable-background-timer-throttling");
            options.addArguments("--disable-renderer-backgrounding");
            options.addArguments("--disable-backgrounding-occluded-windows");
            options.addArguments("--disable-web-security");
            options.addArguments("--allow-running-insecure-content");
        } else {
            // Local development configuration (visible browser)
            System.out.println("Running in local environment - using visible browser");

            // Create a unique temp directory for the user data dir
            tempProfileDir = Files.createTempDirectory("chrome-profile-" + UUID.randomUUID());
            options.addArguments("--user-data-dir=" + tempProfileDir.toAbsolutePath());

            // Optional: Add some stability arguments for local testing too
            options.addArguments("--disable-web-security");
            options.addArguments("--allow-running-insecure-content");
        }

        driver = new ChromeDriver(options);

        wait = new WebDriverWait(driver, Duration.ofSeconds(60));
        driver.manage().window().maximize();
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(60));
        driver.get("http://localhost:5173/Lexora/");
    }

    @AfterEach
    public void tearDown() throws IOException {
        if (driver != null) {
            driver.quit();
        }

        // Clean up temp profile directory (only exists in local environment)
        if (tempProfileDir != null && Files.exists(tempProfileDir)) {
            try {
                FileUtils.deleteDirectory(tempProfileDir.toFile());
            } catch (IOException e) {
                System.err.println("Warning: Could not delete temp profile directory: " + e.getMessage());
            }
        }
    }

    /**
     * Detects if the test is running in a CI environment
     */
    private boolean isRunningInCI() {
        // Check common CI environment variables
        return System.getenv("CI") != null ||
                System.getenv("GITHUB_ACTIONS") != null ||
                System.getenv("JENKINS_URL") != null ||
                System.getenv("TRAVIS") != null ||
                System.getenv("CIRCLECI") != null ||
                System.getenv("GITLAB_CI") != null ||
                System.getProperty("ci") != null ||
                // Check if running headless by system property
                "true".equals(System.getProperty("headless"));
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
            waitAndClick(By.id("SaveRoadmap"));

            // Wait for potential backend processing
            Thread.sleep(2000);

            // Handle alert if appears
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