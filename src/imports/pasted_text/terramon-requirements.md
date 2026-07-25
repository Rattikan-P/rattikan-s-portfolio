Table of Contents: Project Software Requirement Document
Terramon is a free, all-in-one mobile application designed to be a smart gardening assistant. It mixes modern technology with what users really need, helping them take care of their plants with confidence. It is a bridge built to reconnect us with nature.

Chapter One | Introduction and Background
1.1 Purpose
In today's busy life, while gardening offers stress reduction and enhanced living spaces, many plant enthusiasts, especially beginners and busy individuals, struggle with proper plant care. Common problems include forgetting to water, uncertainty about fertilizing, and lack of knowledge about specific plant needs, often resulting in unhealthy or dying plants.
Terramon addresses these challenges through an intelligent mobile app that combines automated care reminders, AI-powered plant identification, expert-based guidance, and community support. By making plant care more accessiblew and manageable, Terramon helps users maintain healthy plants while connecting them with trusted vendors, transforming plant care from a difficult task into an enjoyable and successful experience.

1.2 Acronyms and Definitions
1.2.1 Acronyms
AI 	Artificial Intelligence
API	Application Programming Interface
AWS	Amazon Web Services
URS 	User Requirement Specification
UI 	User Interface


1.2.2 Definitions
Backend	The server-side logic of the application that processes requests, connects to databases, and handles business logic.
Firebase Cloud Messaging 	A service used to send push notifications across Android, iOS, and web platforms.
Frontend	The visual interface and user interaction layer of the mobile app, built using frameworks like Vue.js or React Native.
My Garden	A feature in the Terramon app that acts as a digital plant journal where users can manage and record plant details.
MySQL	Database system, used for storing user information, plant records, notifications, etc. 
Plant Care Vendors	Verified sellers who offer gardening tools, plants, and related products accessible via the app.
Push Notification	Alerts sent to users through the mobile app to remind them about plant care tasks.
Spring Boot	A Java-based framework used for building backend APIs with high scalability and easy configuration.
TensorFlow	A machine learning framework used for building and training custom AI models.
Vue.js	A progressive JavaScript framework used for building responsive and dynamic user interfaces.

1.3 System Architecture
	The Terramon application is built upon a modern, scalable cloud architecture utilizing a multi-tier approach. The system begins with the Mobile Application (Frontend: Vue.js), which allows the User to interact with the system and send requests to the Server (Backend: Spring Boot). This server, hosted on AWS, acts as the central intelligence, coordinating business logic, retrieving user and plant data from the MySQL Database, and calling the AI Framework (TensorFlow/Scikit-learn) for image-based Plant Identification. Finally, the system ensures user engagement by sending automated care reminders through the Notification service, powered by Firebase Cloud Messaging (FCM). This integrated structure ensures reliability, performance, and a smooth user experience.


1.4 Quality Plan
1.4.1 Look and Feel
NFR-LF-01: All user interface elements must comply with the Terramon Brand Style Guide v2.0 and UI Kit. This includes standardized font-family, sizes, and weights across all screens, and consistent header/title scroll behavior. Compliance will be verified through a design review conducted by the Lead Designer and Product Owner using the Brand Compliance Checklist. Review must be completed and approved at least 48 hours before sprint demo. Minimum 95% compliance required to pass.
NFR-LF-02: UI changes in version updates must not alter core brand elements (logo, primary color palette #319F5E, Lexend typography) as defined in Brand Style Guide. Visual regression testing must show less than 5% unintended UI changes between versions.
NFR-LF-03: Header Scroll Behavior: 100% of all primary content page headers/titles must exhibit the Scroll-Away (collapsing/dynamic) behavior when the user scrolls down the page.
1.4.2 Cultural and Political
NFR-CP-01: The application shall provide full UI text localization for English (en-US) and Thai (th-TH). All user-facing content, including plant names and descriptions, must be reviewed and approved by a native speaker of each language before release to ensure there is no offensive or culturally inappropriate material.
NFR-CP-02: All user-generated content, such as community posts and plant notes, must be reviewed and moderated before or after publication to ensure that no inappropriate, offensive, or politically sensitive material is displayed. Moderation practices must comply with applicable laws and respect local cultural norms.




1.4.3 Usability and Humanity
NFR-UH-01: During user acceptance testing, a panel of users representative of the "Beginner Plant Owner" persona shall be observed. At least 90% of this panel must be able to successfully add a new plant to their "My Garden" journal within 45 seconds of their first encounter with the feature, without any external help.
NFR-UH-02: Core user tasks, such as plant identification and care scheduling, must be achievable with no more than three sequential user interactions (taps or selections) to maximize efficiency and accessibility for users of all skill levels.
NFR-UH-03: Login Friction & Flexibility: Users must be able to successfully log in using either a registered username or a registered email address in the single designated input field. The success rate for first-time login attempts during User Acceptance Testing must be 98% or higher.
NFR-UH-04: Icon Clarity & Cognitive Load: 100% of user-facing icons across the application must be clear, and the system must not display ambiguous or decorative icons (e.g., the confusing checkmark icon). Usability testing must confirm users 100% correctly interpret the meaning of all displayed icons.
1.4.4 Operational
NFR-OP-01: The application must be fully installable and operational on all devices running stock Android 10.0 (API Level 29) and higher, and on all Apple devices running iOS 15.0 and higher. Functionality will be verified through testing on a defined set of physical devices and emulators.
NFR-OP-02: The application must recover to a ready state within 30 seconds after an unexpected interruptions, (e.g., system crash, forced close, or loss of network) without data loss for any in progress or unsaved user activities.





1.4.5 Performance
NFR-PE-01: When a user uploads a clear, well-lit photo of a plant, the system shall return identification results within 5 seconds over a standard 4G network connection. For the 50 most common houseplants defined in the project's plant list, the correct species must be ranked within the top 3 results with an accuracy of 90% or higher.
NFR-PE-02: The system must maintain service stability and an average response time of less than 3 seconds under a peak load of 5,000 concurrent users or 2,000 requests per minute, including during mass community postings or large-scale plant identification requests, in accordance with the defined SLA.
1.4.6 Security
NFR-SE-01: All user passwords stored in the system's database must be salted and hashed using the bcrypt algorithm. The system shall never store or log passwords in plain text. Compliance will be verified by a security code review and penetration test before the initial product launch.
NFR-SE-02: All data backups must be encrypted both at rest (while stored) and in transit (while being transferred over a network) using an industry-standard encryption algorithm such as AES-256 to ensure user privacy, business continuity, and data integrity in the event of hardware failure or service disruption.


1.5 Product Features 
There are 6 features as follows:
Feature#1: Authentication
Description: User can start an authentication session by navigating to the Login screen. The system presents a single input field labeled "Username or Email Address" and a separate password field. After submitting their credentials, the system will first process the input by validating it against both the registered username and email address databases to ensure user flexibility. If the credentials are valid, the user will be granted access to the application. The login process adheres to the unified UI standards, ensuring no confusing icons appear in the input fields and that the typography is consistent across the screen.
Feature#2: Plant Identification
Description: User can start a plant identification session by taking a new photo with the device's camera or uploading an existing photo from their device's gallery. After submitting the photo, the system will process it and display a list of potential identification matches with their confidence scores. User can view the details of a selected match, including the plant’s name and photos. If the identification is satisfactory, the user can add the plant to their Digital Plant Journal. If the automatic identification is unsatisfactory, the user can request help from the community.
Feature#3: Care Reminders
Description: User can set care reminders for their plants, including watering time, fertilizing frequency, repotting, pruning, or any custom care tasks. Each reminder can have a specific frequency and time or a specific future date. User can modify existing reminders, mark a task as complete, pause or disable individual reminders, or globally disable all notifications for the app. The system will notify the user when any scheduled care task is due.

Feature#4: My Garden
Description: User can create a new plant entry in their digital journal. The system allows the user to view a list of all plants saved in the journal and open a detailed page for each plant. User can add new photos or text notes to an existing plant entry, edit core information such as nickname, species, or planting date, and delete a plant entry entirely. All updates will be saved in the journal and reflected immediately.
Feature#5: My Garden
Description: User can connect, share, and learn from other plant enthusiasts in a friendly and supportive community. The system allows the user to create new posts, ask questions, share plant photos, and offer advice or experiences with others. Users can also interact through comments and likes within categorized topics such as plant care tips, troubleshooting, and gardening inspiration. All posts are moderated to ensure appropriate, respectful, and relevant content. This feature encourages engagement and helps users expand their plant knowledge through real community experiences.
Feature#6: Vendors Shop
Description: User can browse and purchase high-quality gardening products from verified vendors directly within the app. The system provides a wide selection of items, such as pots, soil, fertilizers, tools, and plants, all with verified seller details, prices, reviews, and secure in-app payment options. User can also receive personalized product recommendations based on their plant collection and preferences, making the shopping experience more convenient, safe, and tailored to individual needs.




1.6 Type of System Users and the Users’ Characteristics 
There is one type of actor:
                1.6.1 User: everyone who use the system

1.7 Use Case Diagram
 

1.8 Limits
1.8.1 The application cannot measure real environmental conditions (e.g., light, humidity, or temperature) without external sensor devices.
1.8.2 The plant care database is based on commonly available houseplant species in Asia.
1.8.3 Certain features, including image-based plant identification, community interactions, and vendor integration, require an active internet connection to function properly.
1.8.4 The notification system depends on the user’s permission; if notifications are disabled, reminders may not appear.
1.8.5 The application will support only two languages (Thai and English) in its first release.

      
Chapter Three | Feature 2

3.1 Feature Description 
Feature#2: Plant Identification
Description: User can start a plant identification session by taking a new photo with the device's camera or uploading an existing photo from their device's gallery. After submitting the photo, the system will process it and display a list of potential identification matches with their confidence scores. User can view the details of a selected match, including the plant’s name and photos. If the identification is satisfactory, the user can add the plant to their Digital Plant Journal. If the automatic identification is unsatisfactory, the user can request help from the community.




















3.2 User Requirement Specification (URS) 
 	URS-01 The user can identify session by taking a new photo with their device's camera.
 	URS-02 The user can identify session by uploading an existing photo from their device's gallery.
 	URS-03 The user can view a list of potential identification matches after submitting a photo.
 	URS-04 The user can view the details for a specific match, including the plant's name, photos, and a confidence score.
 	URS-05 The user can add a plant to their 'My Garden' directly from a successful identification result.





























3.3	Use Case Description 
3.3.1 User Interface























 

























































\

























































































 








3.3.2	Software Requirements Specification

URS-001: User can identify a plant by taking a new photo with their device's camera.
•	SRS-001: On UI-001 (Home Page), the system will provide the "Identify Plant" button. When the user taps "Identify," the system will navigate to the camera option page UI-002.
•	SRS-002: On UI-002 (Camera Option Page), the system will provide two options:
o	SRS-002-001: "Take a Picture" – The system will grant camera permission if not already granted. If permission is denied, the system will show a message: "Camera access is required. Please enable camera access in device settings."
o	SRS-002-002: "Upload a Photo" – The system will prompt the user to choose a photo from their gallery.
•	SRS-003: On the "Photo Confirmation Page" (UI-003), the system allows the user to confirm or retake the captured photo.
o	SRS-003-001: If the user presses the button to capture a photo of the plant using the in-app camera. The system will capture an image and show a preview with the buttons: "Retake Icon," "Use This Picture" and "Cancel."
o	SRS-003-002: If the user taps "Retake Icon," the system will discard the photo and return to the camera page.
o	SRS-003-003: If the user taps "Use This Picture" the system will validate the photo quality.
o	SRS-003-004: If user taps “Cancel” the system will display Cancel Confirmation Alert (UI-004)

URS-002: User can identify a plant by uploading an existing photo from their device's gallery.
•	SRS-004: On UI-002 (Camera Option Page), the system will provide the "Upload a Photo" button.
o	SRS-004-001: If the user selects "Upload a Photo," the system will prompt the user to choose a photo from their gallery.

URS-003: User can view a list of potential identification matches after submitting a photo.
•	SRS-005: If the system successfully processes the photo, it will display a list of potential matches with confidence scores and distinctive features.
o	SRS-005-001: If multiple matches are found with equal or similar confidence scores, the system will display a list of candidate plants with confidence scores and a “Similar Confidence” badge.
o	SRS-005-002: If no match is found, the system will display an alert: "This plant cannot be identified. Please try again or wait for updates to support more plants."
•	SRS-006: If the system detects poor quality in the photo (e.g., blurry or poorly lit):
o	SRS-006-001: The system will display a message: "The image quality is poor. Please retake the photo for better results."(UI-006).
o	SRS-006-002: If the user taps "Retake Icon," the system will discard the photo and return to the in-app camera.
•	SRS-007: If the user denies camera access:
o	SRS-007-001: The system will display a message: "Camera access is required. Please enable camera access in device settings."
•	SRS-008: If the system cannot recognize the plant:
o	SRS-008-001: The system will display an alert: "This plant cannot be identified. It may be a new species. Please try again or wait for future updates." (UI-009).
o	SRS-008-002: The user can tap "Retry" or "Home," and the system will either return to the in-app camera or the home page (UI-001).
•	SRS-009: If the system detects a lost internet connection or server issue:
o	SRS-009-001: The system will display a message: "Unable to connect to the server. Please check your internet connection and try again." (UI-007).
o	SRS-009-002: If the user taps "Try again," the system will attempt to reconnect. If successful, the system will proceed to the identification process (UI-008).
o	SRS-009-003: If the connection remains unavailable after 3 retries, the system will terminate the process.
•	SRS-010: If the system encounters an unexpected error:
o	SRS-010-001: The system will display the message: "Something went wrong with the photo processing. Please try again later." (UI-005).
o	SRS-010-002: After 5 seconds, the system will redirect the user to the Home Page (UI-001).
•	SRS-011: If the system identifies multiple matches with similar confidence scores:
o	SRS-011-001: The system will display the message: "We found several plants that could match your photo. Please select the one that looks most similar to your photo."
o	SRS-011-002: The system will display a list of candidate plants with confidence scores and distinctive features, allowing the user to select the plant.
o	SRS-011-003: Once a plant is selected, the system will navigate to UI-011 (Plant Detail Page).
•	SRS-012: If the system finds no matches above the confidence threshold:
o	SRS-012-001: The system will display the message: "We found some possible matches, but we're not very confident about them. Would you like to see them anyway?"
o	SRS-012-002: If the user taps "Yes," the system will display the results with a warning message: "We're not sure about these results."
o	SRS-012-003: If the user taps "Retake," the system will return to the in-app camera.
o	SRS-012-004: If the user taps "Home," the system will navigate to UI-001 (Home Page).




URS-004: User can view the details for a specific match, including the plant's name, photos, and confidence score.
•	SRS-013: If the user successfully identifies a plant, the system will show UI-010 (Plant Result Page) with the plant's name, photos, and confidence score.

URS-005: User can add a plant to their My Garden directly from a successful identification result.
•	SRS-014: If the user taps "Add to My Garden" in Plant Detail Page (UI-011), the system will show the success message "Successfully added to My Garden" (UI-012) and navigate to UI-013 (My Garden page).

3.3.3 Use case description
Use Case ID	UC-001
Use Case Name	Plant Identification with Camera
Created By	Rattikan	Last Update By	Rattikan
Date Created	09/09/2025	Last Revision Date	10/10/2025
Actors	Users
Description	User can identify plant by capturing a new photo with their device’s camera
Trigger	User selects the option Identify Plant from the application menu.
Preconditions	1. User has a device with a working camera (camera is not broken or disabled).
2. The device has an active internet connection.
3. User is logged into the application.                       
Use Case Input Specification
Input	type	Constraint	Example
Photo	Image	Must be taken with device’s camera. Clear image required.	IMG.png, 
IMG.jpeg
Post conditions	System shows list of potential plant matches with confidence scores (0-100%) and its detail (e.g., plant name, distinctive features, 
confidence score).
Normal Flows
User	System
1. User taps "Identify Plant" button 
2. User selects "Take a Picture" button



4. User presses the button to capture a photo of the plant using the in-app camera.
[A1: User cancels photo capture]

7. User taps "Use Photo" to confirm the captured photo
[A2: User taps "Retake" button]
[A3: User cancels the photo confirmation]





















13. User taps on a specific plant result card to see detailed information
[A8: User add a plant to their My Garden from identification result.]
[A9: User taps "Back" button]	

3. System checks if the app has permission to access the camera.
[E1: Camera permission denied]



5. Captures a photo of the plant 
6. Displays the captured image on a preview screen.



8. System analyzes the image for quality factors such as clarity, focus, and lighting.
[A4: Poor photo quality]
[E2: Loss of Internet or Server Connection During Process] 
[E3: System error in processing photo]
9. System compares the taken photo with the plant database for identification.
[E2: Loss of Internet or Server Connection During Process] 
[E3: System error in processing photo]
[E4: Image cannot be matched to plant database]
10.System navigates to "Identification in Progress" screen (UI-008)
11. System analyzes confidence scores of matches 
[A5: Matches found below confidence threshold]
[A6: Multiple comparable matches with similar or equal confidence scores]
12. Displays a list of potential plant matches with confidence scores.
[A7: User taps "Back to Home" button]
Alternative Flow	[A1: User cancels photo capture]
        A1.1 Go back to step 2 (UI-002)

[A2: User taps "Retake" button]
        A 2.1 Go to step 4 for retaking the photo
[A3: User cancels the photo confirmation]
        A3.1 System displays "Are you sure to cancel" message (UI-004)
                 A3.1.1 If user taps "Yes", navigate to the Home Page (UI-001)
                 A3.1.2 If user taps "No", stay on the Photo Confirmation Page (UI-003), allowing the user to proceed with confirming the photo.
[A4: Poor photo quality]
        A4.1 Image quality is poor (e.g., clarity below 70%, focus below 80%, or lighting below 60%).
        A4.2 System displays "The image quality is poor. Please retake the photo for better results." message (UI-006)
        A4.3 Taps "Take Picture Again" to go back to step 4
[A5: Matches found below confidence threshold]
        A5.1 When no matches meet the minimum confidence threshold (70%), system displays  "We found some possible matches, but we're not very confident about them. Would you like to see them anyway?" message
                 A5.1.1 If user taps "Yes": 
                             - System displays results with confidence scores
                             - Shows warning message "We're not sure about these results. Please check carefully if they are the plants, you are looking for." 
                 A5.1.2 If user taps "Retake": Go back to step 4
                 A5.1.3 If user taps "Home": Go back to Home Page (UI-001)
[A6: Multiple comparable matches with similar or equal confidence scores]
        A6.1 When multiple plants have:
                 - Equal confidence scores (e.g., Plant A: 85%, Plant B: 85%), OR  
                 - Similar confidence scores within 5% range (e.g., Plant A: 92%, Plant B: 89%, Plant C: 87%)
        A6.2 System displays "We found several plants that could match your photo. Please select the one that looks most similar to your photo." message
        A6.3 The system displays a list of plants with comparable confidence scores, showing a "Similar Confidence" badge next to the plant names or images, along with distinctive features (e.g., leaf shape, flower color, etc.) to help the user compare the plants 
        A6.4 If all comparable matches fall below the minimum confidence threshold, treat as [A5: Matches found below confidence threshold]


[A7: User taps "Back to Home" button]
        A7.1 Go back to Home Page (UI-001)
[A8: User add a plant to their 'My Garden' from identification result.]
        A8.1 User selects "Add to My Garden" button on Plant Detail Page (UI-011)
        A8.2 System displays "Successfully added to My Garden." message (UI-012)
        A8.3 Go to My Garden (UI-013)
[A9: User taps "Back" button]
        A9.1 Go back to Plant Results Page (UI-010)
Exception Flow	[E1: Camera permission denied]
        E1.1 System triggers the mobile OS permission dialog requesting camera access.
                 E1.1.1 If user grants permission, return to main flow.  
                 E1.1.2 If user denies permission, system displays "Camera access is required. Please enable camera access in device settings." and navigate to Home Page (UI-001)
[E2: Loss of Internet or Server Connection During Process] 
        E2.1 System displays "Unable to connect to the server. Please check your internet connection and try again." message (UI-007)
        E2.2 User taps "Try Again"
                 E2.2.1 If the connection is restored: System proceeds to Step 9.
                 E2.2.2 If the connection is still unavailable, system displays a message: "Still unable to connect. Please try again." The user can retry up to 3 times.
                 E2.2.3 After 3 retry attempts, use case end
[E3: System error in processing photo]
        E3.1 System displays "Something went wrong with the photo processing. Please try again later."  message (UI-005)
        E3.2 After 5 seconds, automatically redirects to Home Page (UI-001)
[E4: Image cannot be matched to plant database]
        E4.1 System displays “This plant cannot be identified. It may be a new species. Please try again or wait for future updates to support more plants.” message (UI-009)
                 E4.1.1 If user taps "Retry": Go back to step 4
                 E4.1.2 If user taps "Home": Go back to Home Page (UI-001)
Note	This use case only covers identification via new photo capture.


Activity Diagram

































Chapter Eleven | Appendix 
●	Quality Gateway Checklist
	Yes	No	Remark
Completeness			
•	Are there any missing components?	✓		PROBLEM: NFR-LF-01: "approved Terramon Brand Style Guide and UI Kit" not defined (what documents? where located? who approves?). 
NFR-LF-02: Missing fit criterion entirely (how to measure "consistency"?). 
NFR-CP-02: No moderation SLA, response time, or accuracy metrics. 
NFR-OP-02: Missing specific recovery time. 
NFR-PE-02: Missing specific number for "peak concurrent activities". 
NFR-SE-02: No encryption standard, backup frequency.

•	Meaningful to all stakeholders?	✓		Requirements are understandable to both technical and business stakeholders
Traceability			
•	Is the requirement uniquely identifiable and cross-referenced to business use case, product use case, dependent requirement, and conflict requirement?
		✓	Requirements have unique IDs (NFR-LF-01, etc.) but lack cross-references to business use cases, functional requirements, or dependencies


Consistency			
•	Does the specification contain a definition of every essential term?		✓	Undefined key terms: 
"Formal design review"(NFR-LF-01),
 "Remain consistent" (NFR-LF-02), 
"Gracefully recover" (NFR-OP-02), 
"Peak concurrent activities" (NFR-PE-02), "consistent response times" (NFR-PE-02), "geographically diverse" (NFR-SE-02), "inappropriate/offensive content" (NFR-CP-02)
•	Is every reference to a defined term consistent?	✓		Terms are used consistently throughout the document where they appear.
Relevancy			
•	Does this requirement contribute to the purpose of the project?	✓		All requirements directly support the Terramon app's core objectives: user experience, security, performance, and market compliance.
•	Is every requirement relevant within stated boundaries?	✓		All requirements are within the scope of the Terramon mobile application.
Correctness			
•	Does the requirement have a correctly defined fit criterion?		✓	Poor requirements: 
NFR-LF-01 (unclear verification), 
NFR-LF-02 (unmeasurable), 
NFR-CP-02 (no SLA/metrics), 
NFR-OP-02 (no time specified), 
NFR-PE-02 (no thresholds), 
NFR-SE-02 (no standards). 
•	Can it be used as input to design acceptance test?		✓	Cannot create tests: 
NFR-LF-01, LF-02, CP-02, OP-02, PE-02, SE-02 due to missing measurable criteria. 
Viability			
•	Do you have the technological skills to build?	✓		All requirements use established, proven technologies: bcrypt hashing, mobile development (Android/iOS), AI plant identification, localization, cloud backup.
•	Do you have the time and money to build?		✓	High-cost items requiring budget assessment:
AI plant ID with 90% accuracy (NFR-PE-01) requires ML infrastructure and extensive training data. Professional native speaker reviews (NFR-CP-01) are ongoing costs. Content moderation system (NFR-CP-02) may require 24/7 monitoring staff. Geographic backup redundancy (NFR-SE-02) requires multi-region cloud infrastructure. Cost analysis needed before commitment.
•	Is the requirement acceptable to all stakeholders?	✓		No obvious stakeholder conflicts: requirements balance user needs (usability, security), business goals (brand consistency, performance), and compliance (cultural sensitivity).
Being solution-bound			
•	Does it contain any element of technology?		✓	Most requirements are not tied to any specific technology except NFR-SE-01 specifies "bcrypt algorithm" should allow for future cryptographic standards.
•	Is it written in a way that describes a type of procedure?	✓		Requirements correctly describe outcomes and quality attributes, not implementation procedures.
Gold plating			
•	Does it matter if this requirement is not included?	✓		All requirements are essential: 
Security NFRs prevent data breaches (legal/reputation risk), usability NFRs drive user retention, performance NFRs ensure satisfaction, cultural compliance enables market access, brand consistency builds market position, operational compatibility maximizes market reach
Creep			
•	Is any change cause new requirements?			Potential change triggers: 
OS platform update (NFR-OP-01 may need revision), 
new market expansion requiring additional languages (NFR-CP-01), evolving security standards (NFR-SE-01), 
new regulatory requirements (NFR-CP-02). Recommend periodic review cycle.


●	Requirements Change 
Change Request
Project: Terramon	Date: 06 Oct 2025
Change Requester: Pattama Longani	Change No: 01
Change Category (Check all that apply):

☑ Schedule                                          	☐ Cost                     	☑ Scope
☑ Requirements/Deliverables	☑ Testing/Quality                	☐ Resources
Does this Change Affect (Check all that apply):

☑ Corrective Action                                          	☑ Preventative Action                     	☐ Defect Repair
☑ Updates	☐ Other                	
Describe the Change Being Requested:
1.	Font Consistency: Standardize font families, sizes, and weights across all application screens to maintain visual consistency
2.	Login Input Field: Change login to accept both username AND email address in a single input field
3.	Remove Confusing Checkmark Icon from Input Field: Remove the checkmark icon that currently displays inside an input field - users report confusion about what this icon represents since it appears as part of the form rather than indicating any status
4.	Shop Title Behavior: Make shop title scroll away naturally when user scrolls down, matching the behavior of headers on other pages throughout the application
Primary Goal: Achieve design consistency and clarity across all screens to create a cohesive, understandable user experience.

Describe the Reason for the Change:

1.	Font inconsistency affects professional appearance and brand identity 
2.	Single login method (username only) creates unnecessary friction for users 
3.	Checkmark icon inside input field is confusing - users cannot tell if it's part of the form or success feedback, causing usability issues
4.	Shop page title behavior is inconsistent with other pages - need to standardize whether headers stay visible or scroll away throughout the app

Describe all Alternatives Considered:

Option 1: Maintain current inconsistent design and limited login options
•	Pros: No development time required
•	Cons: Continues poor user experience, unprofessional appearance, user confusion
Option 2: Implement comprehensive UI/UX standardization (Selected)
•	Pros: Improved consistency, better usability, enhanced brand image, reduced user errors
•	Cons: Requires development and testing time
Option 3: Partial fixes (address only critical issues)
•	Pros: Less development time
•	Cons: Leaves some inconsistencies unresolved
Describe any Technical Changes Required to Implement this Change:
•	CSS/Styling Updates: Create or update global stylesheet to enforce consistent typography (font-family, sizes, weights) across all components and pages
•	Login Form Modification: Update login input field validation logic to accept both username and email address formats
•	Input Component Refactoring: Remove checkmark icon from input field component in the component library or shared components
•	Header Behavior Standardization: Modify shop page header scroll behavior to match the scroll-away pattern used in other pages (CSS position property or JavaScript scroll listeners)
•	Component Library Updates: Update shared UI components if using a component library
•	Responsive Design Testing: Ensure changes work across different screen sizes and devices
Describe Risks to be Considered for this Change:

•	Regression Risks: Changes to shared components or global styles may inadvertently affect other pages or features not included in testing scope
•	Login Validation: New email/username validation logic must handle edge cases properly (e.g., usernames that look like emails)
•	User Adaptation: Users accustomed to current interface may need time to adjust to changes
•	Browser Compatibility: CSS changes must work consistently across different browsers
•	Testing Coverage: Need comprehensive testing across all affected screens to ensure no visual or functional issues
•	Performance: Minimal risk, but scroll behavior changes should not impact page performance

Mitigation: Thorough regression testing, staged rollout if possible, and user acceptance testing before full deployment

Estimate Resources and Costs Needed to Implement this Change:

Development Resources:
•	Frontend Developer: 2-3 days (16-24 hours)
•	UI/UX Designer review: 0.5 day (4 hours) - for design approval and consistency check

Testing Resources:
•	QA Tester: 1 day (8 hours) - functional and visual regression testing
•	User Acceptance Testing: 0.5 day (4 hours)

Total Estimated Effort: 4-5 days
Cost Estimate: Low - Internal resources only, no external costs required

Describe the Implications to Quality:

Positive Impacts:
•	User Experience Quality: Improved consistency reduces cognitive load and makes the application easier to use
•	Usability: Removing confusing UI elements (checkmark icon) reduces user errors and support requests
•	Professional Quality: Consistent typography and behavior enhances perceived quality and brand professionalism
•	Accessibility: More flexible login options (email/username) improves accessibility for different user preferences
•	Maintainability: Standardized components make future updates and maintenance easier

Testing Quality Requirements: Visual regression testing across all affected screens

Disposition:

☑ Approve                              	☐ Reject                   	☐ Defer

Justification of Approval, Rejection, or Deferral:

This change request is approved based on the following justifications:
•	User Experience Priority: The proposed changes directly address current usability issues that are causing user confusion and friction, particularly the confusing checkmark icon and limited login options
•	Brand Consistency: Standardizing fonts and UI behavior across the application is essential for maintaining professional appearance and brand identity
•	Reasonable Resource Investment: The estimated 4-5 days of effort is justified by the significant improvement in user experience and reduced future support burden
•	Low Risk, High Return: While there are some regression risks, they can be mitigated through proper testing. The benefits far outweigh the risks
•	Preventative Value: Implementing these standards now will prevent inconsistencies from accumulating and becoming more costly to fix later
•	User Feedback: Users have reported confusion with current UI elements, indicating this is not just an aesthetic improvement but addresses real usability problems

Change Board Approval:
Name	Signature	Date
Chonticha Kummayom	 	08 Oct 2025
Thanathorn Teekawong	 	08 Oct 2025
Nuanwan Wongrat	 	08 Oct 2025
Rattikan Muangmoon	 	08 Oct 2025


●	Traceability matrix
URS – SRS
No.	System Requirement Specification	URS-01	URS-02	URS-03	URS-04	URS-05
1	SRS-001					
2	SRS-002					
3	SRS-002-001					
4	SRS-002-002					
5	SRS-003					
6	SRS-003-001					
7	SRS-003-002					
8	SRS-003-003					
9	SRS-003-004					
10	SRS-004					
11	SRS-004-001					
12	SRS-005					
13	SRS-005-001					
14	SRS-005-002					
15	SRS-006					
16	SRS-007					
17	SRS-008					
18	SRS-009					
19	SRS-010					
20	SRS-011					
21	SRS-012					
22	SRS-013					
23	SRS-014					

Requirements Change 
Change Request Item	Target NFR/Feature	Impact type
CR-01: Font Consistency
Standardize font families, sizes, and weights across all screens	NFR-LF-01 (Look and Feel)	Visual Consistency
CR-02: Login Input Field
Accept both username AND email in single input field	NFR-UH-03 (Usability & Humanity), F1 (Authentication)	Usability/Efficiency
CR-03: Remove Checkmark Icon
Remove confusing checkmark icon from input field	NFR-UH-04 (Usability & Humanity)	Usability/Clarity
CR-04: Shop Title Scroll Behavior
Make shop title scroll away to match other pages	NFR-LF-03 (Look and Feel)	Visual Consistency



●	Prototype
https://www.figma.com/proto/xq3f7ikHBApT45PQb8nxqE/SW-Req-Wireframe-G4?node-id=1853-6194&t=Pm8FDcfpjXwyfQyB-0&scaling=scale-down&content-scaling=fixed&page-id=595%3A12&starting-point-node-id=613%3A2987&show-proto-sidebar=1
        

