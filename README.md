# Book Library Project

Welcome to the Book Library! This project allows users to manage their collection of books with the ability to view, add, edit, delete, and mark books as "read". It has three main pages: **Home**, **Add Book**, and **Read Book**.

# Deploy Link

https://67962af57bdbe2b3246c7a86--sensational-otter-a89c4a.netlify.app/

## Features

### Home Page

- Displays all books with details like:

  - **Image**
  - **Title**
  - **Author Name**
  - **Category**
  - **Page Number**
  - **Language**
  - **View Details Button**

- Each book has a **left-side image** with a status indicating whether the book is **read** or **unread**.

- Users can click on the **View Details** button to be redirected to the **Book Details Page**.

- Toasters will show notifications for each operation, such as:
  - Fetching books
  - Completing an action (e.g., adding, editing, deleting, or marking a book as read)

### Book Details Page

- **Complete Book Details** are displayed on this page.
- **Three Buttons**:
  1. **Delete**: Removes the book from the list.
  2. **Edit**: Redirects the user to the **Add Book Page** with the book's details pre-filled. The "Add Book" button changes to "Update Book" for editing the details.
  3. **Mark as Read**: Saves the book ID to **localStorage** and updates its reading status. If the book has already been marked as read, a toaster will notify the user.

### Add Book Page

- Allows the user to **add a new book** to the library with fields such as:

  - **Title**
  - **Author**
  - **Category**
  - **Publish Year**
  - **Description**
  - **Small Thumbnail URL**
  - **Thumbnail URL**
  - **Language**
  - **Page Number**
  - **Publisher**

- If the user is updating a book, the form is pre-filled with the current details of the book, and the "Add Book" button is replaced with "Update Book."

### Read Book Page

- Displays a list of all books marked as **read**.

## How to Run

### Install Dependencies

1. Clone this repository:
   ```bash
   git clone https://github.com/souravroy2001/book-library.git
   ```
