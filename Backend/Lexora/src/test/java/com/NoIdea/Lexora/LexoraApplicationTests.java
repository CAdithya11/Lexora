package com.NoIdea.Lexora;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class LexoraApplicationTests {
	public static void main(String[] arg) {


		//set up chromedriver automatically
		WebDriverManager.chromedriver().setup();
		WebDriver driver = new ChromeDriver();

		//Open Lexora
		driver.get("http://localhost:5173/signIn");

		//Find the search box and enter a search quary
		WebElement email = driver.findElement(By.name("email"));
		WebElement Password = driver.findElement(By.name("password"));

		email.sendKeys("anjalisewmini5@gmail.com");
		Password.sendKeys("12345678");

		// Click the login button
		WebElement loginButton = driver.findElement(By.id("loginButton")); // Replace with actulal id
		System.out.println(loginButton);
		loginButton.click();


		//Wait for results to load
		try {
			Thread.sleep(15000);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}

		//Print the page title
		System.out.println("page title" + driver.getTitle());

		//Close the browser
		driver.quit();
	}
}
