# ETHIGUARD 🚀🔍

![License](https://img.shields.io/github/license/marcushash/Ethiguard-Dark-Pattern-Buster?style=flat-square)
![Issues](https://img.shields.io/github/issues/marcushash/Ethiguard-Dark-Pattern-Buster?style=flat-square)
![Forks](https://img.shields.io/github/forks/marcushash/Ethiguard-Dark-Pattern-Buster?style=flat-square)
![Stars](https://img.shields.io/github/stars/marcushash/Ethiguard-Dark-Pattern-Buster?style=flat-square)

## Browser Extension for Tracking Pixel Detection 🛡️

- **By:** Thejal M

ETHIGUARD is a browser extension crafted using HTML, CSS, and JavaScript to address growing concerns surrounding online privacy and tracking. It identifies and monitors tracking pixels embedded within websites in real-time. With ETHIGUARD, users can detect and manage these tracking mechanisms efficiently, ensuring a more private browsing experience.

## What Is Deceptive Data Collection? 🤔

Deceptive design patterns, often referred to as dark patterns, are user interface (UI) design techniques used to manipulate users into taking actions or making choices they might not otherwise make. This extension helps uncover these patterns by focusing on tracking pixels.

## What Are Tracking Pixels? 🖼️

Tracking pixels, also known as web beacons or pixel tags, are tiny, invisible graphic images embedded in web pages or emails. They track user behavior and gather information about website visitors' interactions.

### How Are Tracking Pixels Used? 📊

1. **Data Collection**: When a user visits a web page containing a tracking pixel, their browser loads the image from the server. This sends a request with details like IP address, browser type, and device information.

2. **Tracking**: The server records this information and associates it with a unique identifier, allowing tracking across multiple pages or sessions.

3. **Analytics and Targeting**: The collected data is used for website analytics, targeted advertising, personalization, and measuring marketing effectiveness.

4. **Examples of Collected Data**:
   - IP Address
   - Browser and Device Information
   - Referral Source
   - Page Views and Interactions
   - Cookies and Session IDs
   - User Preferences
   - Conversion Events
   - Social Media Engagement

## How Does Our Extension Work? 🔧

1. **Retrieving Images and SVGs**:
   ETHIGUARD retrieves all image and SVG elements from the webpage using JavaScript.

2. **Checking Dimensions**:
   It checks the dimensions of these elements to identify those that are 0x0 pixels, indicating hidden or invalid tracking pixels.

3. **Checking for Links**:
   ETHIGUARD inspects whether the invalid pixels contain a link, identifying potential tracking pixels.

4. **Counting Tracking Pixels**:
   It increments a counter for each detected tracking pixel and displays the count to the user.

## Working Examples 🧩

### Initialization:
The `checkImageSizes` function initializes an empty array `verifiedElements` to store elements that match the criteria.

### Criteria:
- Sets `maxWidth` and `maxHeight` to 1 pixel.
- Selects various elements (img, svg, button) and checks their dimensions.

### Checking Dimensions:
- For each `img` or `svg`, it checks if dimensions are ≤ 1 pixel and if they contain a link.
- Adds matching elements to `verifiedElements`.

### Final Actions:
- Updates the badge and sends messages to the background script to update counts in the database based on `switchValue`.
- Flags elements with dimensions ≤ 1x1 pixels and adds them to `verifiedElements`.

## Usage 📈

1. **Install the Extension**: Follow the installation instructions for your browser.
2. **Open a Web Page**: Navigate to a page with images you want to analyze.
3. **Activate Analysis**: Click the extension icon in your browser toolbar.
4. **View Alerts**: Check highlighted images and details about detected tracking pixels.
5. **Generate Reports**: Export a summary of detected issues and their details.

## Contributing 🤝

Contributions are welcome! To contribute:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Create a new Pull Request.

Please adhere to the project's coding standards and guidelines.

## License 📜

This project is licensed under the MIT License - see the [LICENSE](https://github.com/marcushash/Ethiguard-Dark-Pattern-Buster/blob/main/LICENSE) file for details.

## Contact 📧

For any questions or issues, please reach out to:

- **Thejal M**: [LinkedIn](https://www.linkedin.com/in/thejal-murali-a4a014282/) | [Email](mailto:vv2004thejal@gmail.com)
