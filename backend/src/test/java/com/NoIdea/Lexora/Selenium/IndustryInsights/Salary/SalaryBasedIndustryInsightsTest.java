package com.NoIdea.Lexora.Selenium.IndustryInsights.Salary;

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

public class SalaryBasedIndustryInsightsTest {

    private WebDriver driver;
    private WebDriverWait wait;
    private Path tempProfileDir;

    @BeforeEach
    public void setUp() throws IOException {
        WebDriverManager.chromedriver().setup();

        ChromeOptions options = new ChromeOptions();
        options.addArguments("--headless=new");
        options.addArguments("--disable-gpu");
        options.addArguments("--no-sandbox");
        options.addArguments("--disable-dev-shm-usage");
        options.addArguments("--disable-extensions");
        options.addArguments("--window-size=1920,1080");
        options.addArguments("--remote-debugging-port=9222");


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
        if (tempProfileDir != null) {
            FileUtils.deleteDirectory(tempProfileDir.toFile());
        }
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

    private void waitForChartToLoad() {
        wait.until(ExpectedConditions.presenceOfElementLocated(By.id("showTrends")));
    }

    private void loginToApplication() {
        waitAndClick(By.id("singInButton"));
        waitAndSendKeys(By.name("signinemail"), "anjalisewmini5@gmail.com");
        waitAndSendKeys(By.name("signinpassword"), "12345678");
        waitAndClick(By.id("loginButton"));
    }

    @Test
    @DisplayName("Salary Based Industry Insights Workflow Test")
    public void testSalaryBasedIndustryInsights() {

        // Step 1: Login
        loginToApplication();

        // Step 2: Navigate to Salary Trends
        waitAndClick(By.id("Industry Insights"));
        waitAndClick(By.id("SalaryTrends"));

        // Step 3: Charts - Pie, Line, Radar, Salary
        waitAndClick(By.id("pie"));
        waitForChartToLoad();

        waitAndClick(By.id("line"));
        waitForChartToLoad();

        waitAndClick(By.id("radar"));
        waitForChartToLoad();

        waitAndClick(By.id("salary"));
        waitForChartToLoad();

        // Step 4: Select Country
        waitAndClick(By.id("Country"));
        waitAndSendKeys(By.id("SearchCountries"), "United States");
        waitAndClick(By.id("United States"));
        waitForChartToLoad();

        // Step 5: Apply Date Filters
        waitAndClick(By.id("DateTime"));
        waitAndClick(By.id("year"));
        waitAndClick(By.id("year")); // double click as per your script
        waitAndClick(By.id("week"));
        waitAndClick(By.id("ApplyDateTime"));
        waitForChartToLoad();

        // Step 6: View updated charts
        waitAndClick(By.id("line"));
        waitForChartToLoad();

        waitAndClick(By.id("radar"));
        waitForChartToLoad();

        waitAndClick(By.id("salary"));
        waitForChartToLoad();

        // Step 7: Select Job Categories
        waitAndClick(By.id("Software Development"));
        waitAndClick(By.id("Web Development"));
        waitForChartToLoad();

        // Final: Assert user is still on Lexora page
        assertTrue(driver.getTitle().toLowerCase().contains("lexora") || driver.getCurrentUrl().contains("Lexora"),
                "User should remain on Lexora platform after interaction.");
    }
}
