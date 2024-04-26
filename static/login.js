// document.addEventListener("DOMContentLoaded", function() {
//     const loginForm = document.getElementById("loginForm");
  
//     loginForm.addEventListener("submit", function(event) {
//       event.preventDefault();
      
//       const email = document.getElementById("email").value;
//       const password = document.getElementById("password").value;
  
//       // Check credentials against SQLite database
//       checkCredentials(email, password);
//     });
  
//     // Function to check credentials against SQLite database
//     function checkCredentials(email, password) {
//       // Load the SQLite database file
//       fetch('../database/logindata.sqlite')
//         .then(response => response.arrayBuffer())
//         .then(buffer => {
//           // Initialize SQL.js with the database buffer
//           const db = new SQL.Database(new Uint8Array(buffer));
          
//           // Query the database for user data
//           const query = `SELECT * FROM users WHERE email = ?`;
//           const stmt = db.prepare(query);
//           stmt.bind(email);
//           if (stmt.step()) {
//             const user = stmt.getAsObject();
//             if (user.password === password) {
//               alert("Login successful!");
//               window.location.href = "../templates/index.html"; // Redirect to index.html
//             } else {
//               alert("Invalid email or password. Please try again.");
//             }
//           } else {
//             alert("Invalid email or password. Please try again.");
//           }
//         })
//         .catch(error => console.error("Error loading SQLite database:", error));
//     }
// });
