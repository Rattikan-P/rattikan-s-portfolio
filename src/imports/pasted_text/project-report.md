Project Report

bingChilling Online Webstore

Submitted by

Chonticha Kummayom student ID 662115009
Thanathorn Teekawong student ID 652115021
Nuanwan Wongrat student ID 662115028
Rattikan Muangmoon student ID 662115042

This report is part of the course 953262
Front-end and Web Development Foundation
College of Arts Media and Technology
Chiang Mai University

2024

1

Project description

The Online Webstore System (OWS) provides a seamless shopping experience for
customers while enabling shop owners to efficiently manage products and orders. The system
allows customers to browse products, add items to their shopping cart, and place orders, while
shop owners can manage inventory and view sales reports through an intuitive back-office panel.
Use cases
The primary purpose of the webstore is to facilitate online shopping. Customers can
register, log in, search for products, view product details, manage their shopping cart, and
complete purchases. Shop owners can manage product categories, add/edit/delete products, and
track orders and sales reports.
Use Case 1: Customer Registration and Login
Actor: Customer
Goal: The customer registers for an account and logs in to the system.
Scenario:
1.1 The customer opens the website and lands on the Homepage.
1.2 The customer clicks "Login" in the navigation menu.
1.3 The system redirects to the Login Page, where the customer can enter credentials or
click "Create Account".
1.4 If the customer clicks "Create Account", the system redirects to the Registration Page.
1.5 The customer fills in their details (email, password, first name, last name, date of
birth.) and submits the form.
1.6 The system validates the data and creates a new account in the USERS and
USER_ACCOUNTS table in database.
1.7 After successful registration, the system redirects to the Login Page.
1.8 The customer logs in with their credentials.
1.9 The system verifies login details with the USER_ACCOUNTS table, creates a
session, and redirects the customer to the Homepage.

Use Case 2: Searching for Products
Actor: Customer
Goal: The customer registers for an account and logs in to the system.
Scenario:
2.1 The customer clicks the search bar in the navigation menu.
2.2 The system retrieves the best-selling products from the ORDER_DETAILS and
PRODUCTS tables based on total sales and displays them below the search bar.
2.3 The customer enters a keyword to find specific products.
2.4 The system retrieves and displays matching products from the PRODUCTS table.
2.5 The customer selects a product to view its details.

2

Use Case 3: Viewing Product Details
Actor: Customer
Goal: The customer views details of a selected product.
Scenario:
3.1 The customer selects a product from the product list.
3.2 The system displays product details (name, description, price, images, stock,
promotions).

Use Case 4: Adding Products to Shopping Basket
Actor: Customer
Goal: The customer adds products to their shopping basket.
Precondition: The customer must be logged in.
Scenario:
4.1 The customer selects a product from the product list.
4.2 The customer clicks "Add to Cart" on the Product Detail Page.
4.3 The system checks if the customer is logged in:
4.3.1 If logged in → Proceed to step 4.3
4.3.2 If not logged in → The system redirects to the Login Page.
4.4 The customer can choose the quantity and product type (single box, whole set, etc.).
4.5 The customer clicks the "Add to Cart" button.
4.6 The system updates the shopping_cart table.
4.7 The system displays a successful message.
Use Case 5: Managing Shopping Basket
Actor: Customer
Goal: The customer reviews and modifies their shopping basket.
Precondition: The customer must be logged in.
Scenario:
5.1 The customer clicks the cart icon in the navigation bar.
5.2 The system checks if the customer is logged in:
5.2.1 If logged in → Proceed to step 5.3
5.2.2 If not logged in → The system redirects to the Login Page.
5.3 The customer navigates to the shopping basket page.
5.4 The system retrieves items from the shopping_cart table based on the customer's ID
(user_id).
5.5 The customer updates product quantities or removes items.
5.6 The system updates the shopping_cart table accordingly.
5.7 The system recalculates the total price and updates the UI in real-time.
5.8 The customer chooses one of the following options: clicking Make Payment button
redirects the system to the Checkout Page, while clicking Continue Shopping button
redirects the system to the Homepage.

3

Use Case 6: Checkout Process
Actor: Customer
Goal: The customer completes the checkout process to place an order.
Precondition: The customer has added at least one item to the shopping cart and must select the
items they want to pay for by checking the checkboxes.
Scenario:
6.1 The customer redirected to the Checkout Page.
6.2 The system shows detailed information for each selected item and order summary.
6.3 The customer clicks the Purchase button, and the system redirects to the Order
Completion Page, displaying order details.

Use Case 7: Order Completion
Actor: Customer
Goal: The customer sees the confirmation of a successful order.
Precondition: The customer has successfully proceeded through checkout.
Scenario:
7.1 The customer redirected to the Order Completion Page.
7.2 The system shows order details, including order, product and payment information.
7.3 If the customer refreshes the page, they are redirected to the homepage to prevent
duplicate access.
Use Case 8: Contacting the Shop
Actor: Customer
Goal: The customer sends an inquiry to the shop.
Scenario:
8.1 The customer clicks the Contact icon in the navigation bar.
8.2 The customer navigates to the contact page.
8.3 The customer fills in a contact form with their message.
8.4 The system sends messages to the shop’s email and saves the contact information on
the CONTACTS table in the database.
Use Case 9: Managing Product Information
Actor: Customer
Goal: The customer sends an inquiry to the shop.
Scenario:
9.1 The admin navigates to the product management page.
9.2 The system checks if the admin is logged in:
9.2.1 If logged in → Proceed to step 9.3
9.2.2 If not logged in → The system redirects to the login page.
9.3 The system displays the product management page with a list of all existing products.

4

9.4 The system retrieves products from the database and displays them in a table with
columns: Product Name, Product Image, Category, Description, Normal Price, Discount
Percentage, Stock, and Action.
9.5 The admin can search for specific products:
9.5.1 The admin enters search term in the search field.
9.5.2 The system filters the products in real-time based on the search term.
9.6 The admin can filter products by category:
9.6.1 The admin clicks on the category dropdown.
9.6.2 The admin selects a category from the dropdown list.
9.6.3 The system filters and displays only products in the selected category.
9.7 The admin can sort products by name:
9.7.1 The admin clicks on the "Product name sorting ▼" toggle.
9.7.2 The system toggles between ascending (A-Z) and descending (Z-A) order.
9.7.3 The "Showing name A-Z" or "Showing name Z-A" text updates accordingly.
9.8 The admin can add a new product:
9.8.1 The admin clicks the "ADD NEW PRODUCT" button.
9.8.2 The system redirects to the add product page.
9.8.3 The admin uploads a main product image by clicking on the image
placeholder or using drag and drop.
9.8.4 The admin selects a product category from the dropdown.
9.8.5 The admin enters a product name. 9.8.6 The admin uploads thumbnail
images (up to 5). 9.8.7 The admin uploads a product description image.
9.8.8 The admin sets values for required product variations: a. For "Whole set":
amount, price, and discount percentage b. For "Single Box": amount, price, and
discount percentage
9.8.9 The admin optionally adds other custom variations with their respective
amount, price, and discount.
9.8.10 The admin clicks the "Save" button.
9.8.11 The system validates the inputs: - If valid → The system creates the
product and shows success message. - If invalid → The system displays error
messages and highlights the invalid fields.
9.8.12 The system redirects back to the product management page.
9.9 The admin can edit an existing product:
9.9.1 The admin clicks the edit button (pencil icon) for a specific product.
9.9.2 The system redirects to the edit product page with pre-filled data.
9.9.3 The admin modifies any of the product details: image, name, category,
thumbnails, description, variations, amounts, prices, or discounts.
9.9.4 The admin clicks the "Save" button.

5

9.9.5 The system validates and updates the product data: - If valid → The system
updates the product and shows success message. - If invalid → The system
displays error messages and highlights the invalid fields.
9.9.6 The system redirects back to the product management page.
9.10 The admin can delete a product:
9.10.1 The admin clicks the delete button (trash icon) for a specific product.
9.10.2 The system displays a confirmation dialog asking "Are you sure you want
to delete this product?".
9.10.3 The admin confirms deletion.
9.10.4 The system removes the product from the database.
9.10.5 The product disappears from the table with a fade-out animation.
9.10.6 The system shows a success notification "Product has been successfully
deleted".
9.11 The admin can navigate between multiple pages of products using pagination
controls at the bottom of the table.
9.12 The admin can log out by clicking the power icon in the navigation bar. Then the
system redirects to the login page.
Use Case 10: Managing Product Categories
Actor: Shop owner (Admin)
Goal: The shop owner manages product categories like table category list, edit category, and add
new category.
Precondition: The admin must be logged in.
Scenario:
10.1The admin navigates to the category management page.
10.2The system checks if the admin is logged in:
10.2.1 If logged in → Proceed to step 10.3
10.2.2 If not logged in → The system redirects to the login page.
10.3The system displays the category management page with a list of existing categories.
10.4The system retrieves categories from the database and displays them in a table with
category images, names, and action buttons.
10.5The admin can search for specific categories:
10.5.1 The admin enters search text in the search field.
10.5.2 The system filters the categories in real-time based on the search term.
10.6The admin can sort categories by name:
10.6.1 The admin clicks on the sort of toggle.
10.6.2 The system toggles between ascending (A-Z) and descending (Z-A) order.
10.7The admin can add a new category:
10.7.1 The admin clicks the "ADD NEW CATEGORY" button.
10.7.2 The system redirects to the add category page.

6

10.7.3 The admin uploads a category image by clicking on the image placeholder
or using drag and drop.
10.7.4 The admin enters a category name and optional description.
10.7.5 The admin clicks the "Save" button.
10.7.6 The system validates the inputs:
- If valid → The system creates the category and shows success message.
- If invalid → The system displays error messages.
10.7.7 The system redirects back to the category management page.
10.8The admin can edit an existing category:
10.8.1 The admin clicks the edit button for a specific category.
10.8.2 The system redirects to the edit category page with pre-filled data.
10.8.3 The admin modifies the category image, name, or description.
10.8.4 The admin clicks the "Save" button.
- If valid → The system creates the category and shows success
message.

10.8.5 The system validates and updates the category data.
10.8.6 The system redirects back to the category management page.
10.8.7
10.9The admin clicks the delete button for a specific category.
10.9.1 The system displays a confirmation modal dialog.
10.9.2 The admin confirms deletion.
10.9.3 The system removes the category and shows a success toast notification.
10.9.4 The category list refreshes automatically.
10.10 The admin can navigate between multiple pages of categories using pagination
controls.
10.10.1The admin can log out by clicking the logout button. Then the system
redirects to the homepage.

Use Case 11: Viewing Sales Reports
Actor: Shop owner (Admin)
Goal: The shop owner views sales history and reports.
Scenario:
11.1 The shop owner navigates to the HOME/DASHBOARD section of the admin panel.
11.2 The system displays the dashboard overview showing:
11.2.1 Statistics cards (Completed Orders, Products, Revenue, etc.)
11.2.2 Sales graph visualization
11.2.3 Best sellers list
11.2.4 Recent orders table
11.3 The shop owner selects a time period for the sales graph:
11.3.1 WEEKLY - displays weekly sales data
11.3.2 MONTHLY - displays monthly sales data (default view)
11.3.3 YEARLY - displays yearly sales data
11.4 The system updates the sales graph based on the selected time period.

7

11.5 The shop owner reviews recent order information:
11.5.1 Product name
11.5.2 Order ID
11.5.3 Date
11.5.4 Customer name
11.5.5 Price in Thai Baht (฿)
11.6 The shop owner navigates through pages of orders using pagination controls.
11.7 The shop owner can log out by clicking the power icon in the navigation bar.

8

Concept ideas for UI design
1. User characteristics considered in the design:
1.1 Visually-driven shoppers
• Prominent product images (multiple angle slides).
• Thumbnail navigation.
1.2 Detail-oriented collectors
• Comprehensive product information.
• Clear product variant options.
• Detailed specifications for collectibles.
1.3 Users from both computers and mobile devices
• Responsive design using Bootstrap grid system.
• Shopping experience is accessible on both desktop and mobile.
1.4 Impulse buyers
• Visual indicators for discounts and new arrivals.
2. Design elements reflecting these characteristics:
2.1 Clean and simple design
• Uses white or light gray backgrounds to create a clean, uncluttered look that
emphasizes important content.
• Efficiently use whitespace to separate elements and make the design more breathable.
• Simple and recognizable icons, such as shopping cart and magnifying glass for
search.
• Consistent UI elements like buttons, text boxes, and product cards for a smooth user
experience.
2.2 User-friendly navigation
• Top navigation bar includes: Logo, All product, Product categories, Search bar,
Login/User account, Shopping cart, Contact.

9

2.3 Clear call-to-action (CTA) buttons
• Buttons use contrasting colors to stand out: "Add to Cart", "Purchase", "Checkout",
etc. have darker tones for clarity.
• Hover effects to show interaction when users move their mouse over buttons.
2.4 Responsive and mobile-friendly
• Design uses grid layout to adapt to different screen sizes, both desktop and mobile
devices.
• Uses column layout to ensure proper spacing and arrangement.
• Buttons and UI elements are adequately sized for touchscreen use.
2.5 Visual hierarchy and typography
• Uses easy-to-read fonts with clear hierarchy.
• Different font sizes and colors emphasize important information.

10

Frameworks and tools

1. Frontend Development Frameworks
a. EJS
2. CSS Frameworks
a. Bootstrap
3. Backend Development Frameworks
a. Express.js
4. Database Management Tools
a. MySQL Workbench
5. Web Design & Prototyping Tools
a. Figma
6. Web Development IDEs & Code Editors
a. Visual Studio Code (VS Code)
7. Version Control & Code Collaboration
a. Git
b. GitHub
c. Fork

11

User flow
webstore pages

https://drive.google.com/file/d/1HjsfCZ60BJwM_QCdjd3otIOfISRAdPpt/view

12

User flow
Back-office pages

https://drive.google.com/file/d/19qoKNgPBkPTycUCaEhQlsoAnkYLp9X9H/view?usp=share_link

13

UI design

1. What user can do on the UI?
Product Details: View product name, price (including original and promotional price), images
(with carousel for multiple images), variations, quantity selection, and description.
Product Variations: Interact with variation buttons to select desired options, which updates the
displayed price and stock availability.
Quantity Selection: Adjust product quantity by using "+" and "-" buttons or inputting a number
directly, with quantity limits based on available stock.
Add to Cart: Add selected product (with variation and quantity) to the cart. This triggers a
SweetAlert2 success notification.
Navigation: Use the navigation bar to move between different sections of the website.
Order Completion: After placing an order, users are directed to the "Order Completion" page,
which includes order details such as ID, delivery date, shipping address, product list, and total
price.
Cart Management: Users can view and manage their shopping cart using cart-utils.js and the
loadCartItemCount() function.
Proceed to Payment: On the cart/checkout page, users can initiate the payment process by
clicking the "payment-btn." after selecting items.
Product Browsing: Browse various product categories (Sonny Angel, HIPPERS, DECORATIVE
MINATURES, POP MART) and view product listings, new arrivals, and discounted items.
Search Products: Use the search bar to find products.
Account Management: Log in or create an account, manage shipping address and phone number,
view order history, and access personal information.
Contact Support: Access a "Contact Us" page for inquiries or support.
Order Completion Status: View detailed breakdowns of items, shipping costs, discounts, and
total payment after a successful order.
Cart Overview: Potential cart display with the "Total... item(s) Total Price" visible on the
checkout page.
Checkout: Select delivery method, payment method (QR Code, Bank Transfer, Credit/Debit
Card, Cash on Delivery), and proceed with the order.

14

Admin Dashboard: View key metrics, sales graphs, top-selling products, recent orders, and
navigate through the admin panel. Log out of the system.
Product Management UI (Admin): Manage all products, including searching, filtering, sorting,
adding, editing, and deleting products. View product details and perform actions like editing
price, stock, and variations.
Add/Edit Product (Admin): Create or update product listings by uploading images, adding
variations, entering details, setting prices and stock, and saving the information. The form
includes validation feedback for required fields.
2. How user can interact with the UI, if the UI handles event(s).
1. Clicking:
1.1 Product Categories & Listings:
1.1.1 "Sonny Angel", "POP MART", "Action Figures", and other categories:
Clicking on any category name navigates the user to the product listings
filtered by that category. Clicking an individual product (e.g., "Sonny Angel
Series") opens the product detail page, where users can see the product's
variations, price, and additional details.

1.2 Account Actions:
1.2.1 "Login" (on the header or in a popup) opens the login modal, where users
can input email and password to sign in.
1.2.2 "Create an Account" redirects users to the account registration page to input
necessary information like name, email, password, and confirm password.

1.3 Search Bar:
1.3.1 "Search" button (or pressing Enter) initiates the search query to filter and
display products based on the text entered.
1.3.2 Clicking inside the "Search" bar activates it, allowing users to type the
search terms.
1.4 Contact Form:
1.4.1 "Submit" button under the Contact Us form triggers form validation
(checking for missing fields like name, email, and message). If valid, it
submits the form to the server with the entered details. After successful
submission, a confirmation message appears.

1.5 Delivery & Payment Method Selection:
1.5.1 Clicking on "Standard Delivery", "Express Delivery", or similar delivery
options updates the delivery method visually (e.g., highlighting the selected
method) and adjusts the estimated delivery time and shipping cost.
1.5.2 Clicking on payment methods such as "Credit/Debit Card", "PayPal", or
"Cash on Delivery" updates the selected payment method and visually
marks it (e.g., adding a selected class).

15

1.6 Purchase:
1.6.1 The "PURCHASE" button in the Checkout page triggers a final check on
the cart’s contents and confirms payment. Once the payment details are
confirmed, the page submits the order to the server.

1.7 Logout:
1.7.1 Clicking "Logout" in the user profile dropdown (top-right of the page) logs
the user out, clears the session, and redirects to the login page.

2. Typing:
2.1 Search Bar:
2.1.1 As users type in the "Search" bar, the product list filters in real-time based
on the entered terms. For example, typing "Vinyl Toy" filters the products
by those containing this term in the title or description.

2.2 Account Creation/Login:
2.2.1 Users type their email and password in the respective fields to log in or
create a new account. The "Login" or "Create Account" button is clicked
to validate and submit the data.

2.3 Contact Form:
2.3.1 Users type their name, email, and message in the Contact Us form. The
"Submit" button is clicked only after all fields pass validation.

3. Selecting:
3.1 Product Quantity:
3.1.1 Clicking the "+" button increases the quantity of a selected product (e.g., 1
→ 2), while clicking the "-" button decreases it (e.g., 2 → 1).
3.1.2 If a user manually enters a quantity in the "Quantity" input field, the UI
validates that the entered value does not exceed available stock and
ensures it’s greater than 0.
3.1.3 The "Add to Cart" button is only enabled if the quantity is valid (within
the allowed range).

3.2 Product Variations:
3.2.1 Clicking on variation options (e.g., "Size: Small", "Color: Red") updates
the product's details such as price, stock, and description. For example,
selecting "Red" might show the product's price as $20 and the availability
as In Stock.
4. Interactive Dashboard:
4.1 Sales Graph Controls:
4.1.1 Clicking on "Weekly", "Monthly", or "Yearly" tabs switch the data shown
on the sales graph. Smooth transitions animate the graph update.

4.2 Dashboard Cards:
4.2.1 Hovering over cards like "Sales Overview" or "Orders Summary"
highlights the card with a subtle animation to indicate interactivity (e.g.,
changing the background color). Clicking opens more detailed information
on sales, orders, or other data.

16

5. Product Listings:
5.1 Best Sellers Section:
5.1.1 Hovering over any product entry (e.g., "Sonny Angel Figure") triggers
subtle animations, such as background color change or a small pop-up
effect to encourage interaction.

5.2 Orders Table:
5.2.1 Clicking on specific rows in the Orders Table (e.g., order number #12345)
shows detailed information like ordered items, delivery method, and total
price. Hovering over rows highlights them with a color transition effect.

6. Pagination Controls:
6.1 Product & Order Pagination:
6.1.1 Clicking on "1", "2", or "Next" in the pagination navigation allows users
to go through pages of product or order listings. Each page transition uses
a smooth animation to refresh the content without reloading the page.

7. Mobile Menu:
7.1 Hamburger Icon:
7.1.1 Clicking the hamburger icon opens or closes the mobile navigation menu.
The transition is animated to slide in/out from the left side of the screen,
making it smooth and intuitive on smaller screens.

8. Search Functionality:
8.1 Real-Time Search:
8.1.1 As users type in the "Search" bar, product results are filtered instantly. For
example, typing "Art Toy" filters products such as "Art Toy Figurines" and
"POP MART Collectibles" without waiting for a submit action.

9. Category Dropdown:
9.1 Category Filtering:
9.1.1 Clicking on "All Categories" dropdown expands the list of product
categories. Selecting an option like "Toys" filters the product listings to
show only toys. A selected category is highlighted visually.

10. Sorting Controls:
10.1Product Sorting:
10.1.1 Clicking on "Sort by Name (A-Z)" or "Sort by Price (Low to High)"
toggles between ascending and descending order. This action immediately
updates the products displayed in the chosen order.

11. Product Actions:
11.1 Editing & Deleting Products
11.1.1 Clicking the pencil icon (edit) for any product opens a form pre-filled with
the product’s current details for editing. The trash icon (delete) shows a
confirmation dialog to prevent accidental deletion.

11.2 Add New Product:
11.2.1 Clicking the "ADD NEW PRODUCT" button redirects to a form where
admins can input the new product details (name, price, stock, etc.).

17

12. Form Fields:
12.1Product Creation & Editing:
12.1.1 Admins type product details like name, price, category, description, and
images in the form. Upon submission, the "Save" button triggers form
validation (fields like price and name are required). If validation passes,
the product is saved.
13. Variation Management:
13.1Adding/Removing Variations:
13.1.1 Admins can click the "Add Variation" button to create a new product
variation. A modal or input field opens to add the new variation.
13.1.2 To remove variations, users click the "Remove" button next to each
variation, and confirmation is required.

14. Notifications:
14.1Toast Notifications:
14.1.1 After performing actions like adding products to the cart or editing
product details, a toast notification appears with success or failure
messages. For example, a "Product added to cart" toast fades in and out.

15. Loading and Visual Feedback:
15.1 Spinning Loader:
15.1.1 When submitting forms (e.g., during the "Checkout" process or "Add to
Cart"), a spinning loader appears on the screen to indicate that the request
is being processed.

16. Image Upload:
16.1Product Images:
16.1.1 Clicking the "Upload Image" button allows admins to upload product
images. Alternatively, users can drag and drop image files directly onto
designated upload areas. A visual cue like "drag-over" appears while
dragging images.
17. Save/Cancel Buttons:
17.1Form Submission:
17.1.1 The "Save" button submits the form after product data is filled. It becomes
disabled during submission to prevent duplicate requests, and a loading
spinner appears.
17.1.2 Clicking "Cancel" returns the user to the previous page or discards any
changes made to the form.

18

3. Which Bootstrap component is used on the UI, if any.
3.1 Grid System: Classes like container, row, and col-md-6 are part of Bootstrap's grid
system for creating responsive layouts.
3.2 Carousel: The HTML structure with id="productCarousel", carousel slide, carousel-
inner, carousel-item, carousel-control-prev, carousel-control-next, and the associated
JavaScript initialization (new bootstrap.Carousel(productCarousel)) clearly indicates
the use of Bootstrap's Carousel component for displaying product images.
3.3 Forms: For the login, account creation, and contact forms.
4. How web templates are used on the UI, if any.
4.1 Dynamic Content Rendering: EJS allows embedding JavaScript code directly
within the HTML markup on the server-side. This enables dynamic generation of
HTML content before it's sent to the browser.
4.2 Data Injection: The <%= product.product_name %>, <%=
productImages[0].product_img_list %>, <%= user ? user.user_id : null %>, <%=
orderDetails.orderId %>, etc., demonstrate how data fetched from the server (like
product details, user information, order details) is injected into the HTML structure
using EJS tags.
4.3 Partials: The <%- include('partials/navbar') %> and <%- include('partials/footer') %>
lines show the use of EJS partials. Partials are reusable template snippets that can be
included in multiple views, promoting code reusability for common UI elements like
the navigation bar and footer.
4.4 Conditional Rendering and Looping: The use of <% if (productImages &&
productImages.length > 0) { %>, <% productImages.forEach(function(imageObject,
index) { %>, and similar constructs shows how EJS allows for conditional rendering
of HTML elements and looping through data to generate dynamic lists or sections.

19

5. How web templates are used on the UI, if any.
5.1 Fetch API:
in the contact.ejs file within the <script> tag associated with the form submission.
Specifically, it's used to make an asynchronous POST request to the /submit-contact
endpoint when the contact form is submitted. This API facilitates sending data from the
UI to the backend server and receiving the server's response.
5.2 Google Maps API:
in the <script> tag in the <head> of the contact.ejs file that loads the Google Maps
JavaScript library from https://maps.googleapis.com/maps/api/js. The initMap() function
then uses this library to embed an interactive map onto the "Contact Us" page within the
div element with the id="map". This API allows the UI to display maps, set the zoom
level, center the map on a specific location (coordinates for CAMT in Chiang Mai), and
place a marker on the map.
5.3 File API:
in the <script> sections of both add and edit category pages. Used to handle file
inputs when users upload category images. The FileReader object reads the uploaded files
and converts them to data URLs. This API enables the UI to access and process files from
the user's device.
5.4 Canvas API:
in the resizeImage function present in both add and edit category files. After
reading image files, this API is used to create canvas elements, resize uploaded images,
and convert them to optimized data URLs (using toDataURL). This allows for client-side
image processing before submission.
5.5 Drag and Drop API:
in both category add and edit pages to enable dragging and dropping images onto
the upload area. Event handlers for "dragover", "dragleave", and "drop" events facilitate
this interaction, providing users with an intuitive way to upload category images.
5.6 Third-party Libraries:
Chart.js For rendering the sales charts on the dashboard and Iconify For
displaying icons throughout the UI (data-icon attributes)

20

APIs

1. API Routes
• /products/...: Manages product data (defined in productRoutes.js).
• /admin/...: Handles administrative tasks (defined in adminRoutes.js).
• /dashboard: Displays the dashboard data for the admin (defined in dashboardRoute.js).
• /category/...: Fetches category-specific product data (defined in categoryRoutes.js).
• /cart/...: Manages shopping cart operations (adding, updating, viewing products in the
cart, defined in cartRoutes.js and app.js).
• /api/categories/:id (DELETE): Deletes a category.
• /register (POST): Handles user registration.
• /login (POST): Handles user and admin login.
• /logout (POST): Handles logout.
• /submit-contact (POST): Handles contact form submission.
• /api/products/:productId (DELETE): Deletes a product.
• /admin/product-backend (GET): Retrieves product data for the admin.
• /product-backend/update/:productId (POST): Updates product data.
• /admin/product-backend/create (POST): Creates new products.
2. Backend Libraries and Middleware
• mysql2: Used to connect and interact with the MySQL database to manage product data,
categories, user accounts, orders, etc.
• bcrypt: Used for securely hashing passwords during user and admin registration, and for
comparing passwords during login.
• express-session: Manages user and admin sessions, allowing the system to remember
logins and persist data across requests.
• fs (File System): Interacts with the file system, specifically for creating directories for
file uploads (e.g., public/uploads).
• Email Sending (e.g., nodemailer): Sends emails when users submit the contact form or
other necessary actions (potentially integrating with third-party email services like
SendGrid or Mailgun).

21

• Model APIs: The model files (e.g., product, category, user, admin, order, productImages)
contain methods that abstract database interactions, providing a layer of API for
accessing data in the backend.
Integration Overview:
1. Routing: The API routes manage various requests from users and admins (e.g., login,
product views, updating data, deleting categories or products).
2. Database Interaction: Through MySQL (using mysql2) and Model APIs for managing
data in the database.
3. Session Management: express-session is used for handling user sessions.
4. File System: Manages file uploads such as product and category images.
5. Email Integration: Sends emails using nodemailer or external email services when the
user submits the contact form or other email-related actions.

22

Implementation
1. Project development directory structure

2. GitHub Link:
https://github.com/camt-pathathai/term-project-section-701-bingchilling.git
3. Demonstration:
3.1 Desktop:

https://drive.google.com/file/d/1XV_gr-
ufzJjWxWFOfnZYc2nEyzrMJJcl/view?usp=sharing

3.2 Mobile:
https://drive.google.com/file/d/1rU_g7DCUAav6CUpnvO8K_d4hgjix3biK/view?usp=sh
aring