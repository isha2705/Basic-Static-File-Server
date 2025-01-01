// server.js

const http = require('http');
const fs = require('fs');
const path = require('path');

// Create an HTTP server
const server = http.createServer((req, res) => {
    // Serve the HTML file for the root request
    if (req.url === '/' || req.url === '/index.html') {
        // Read and serve the HTML file
        fs.readFile(path.join(__dirname, 'public', 'index.html'), 'utf8', (err, data) => {
            if (err) {
                // If error, respond with a 500 internal server error
                res.statusCode = 500;
                res.end('Error loading the page.');
                return;
            }

            // Serve the HTML content
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            res.end(data);
        });
    }
    // Serve the CSS file
    else if (req.url === '/style.css') {
        // Serve the CSS file
        fs.readFile(path.join(__dirname, 'public', 'style.css'), 'utf8', (err, data) => {
            if (err) {
                // If error, respond with a 500 internal server error
                res.statusCode = 500;
                res.end('Error loading the CSS file.');
                return;
            }

            // Serve the CSS content with the correct header
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/css');
            res.end(data);
        });
    }
    // Serve image files
    else if (req.url.startsWith('/images/')) {
        // Determine the file path for the image
        const imagePath = path.join(__dirname, req.url);
        const extname = path.extname(imagePath).toLowerCase();

        // Check if the file exists
        fs.exists(imagePath, (exists) => {
            if (exists) {
                // Read and serve the image file
                fs.readFile(imagePath, (err, data) => {
                    if (err) {
                        // If error, respond with a 500 internal server error
                        res.statusCode = 500;
                        res.end('Error loading the image.');
                        return;
                    }

                    // Set the appropriate content type based on the file extension
                    let contentType = 'application/octet-stream';
                    if (extname === '.jpg' || extname === '.jpeg') {
                        contentType = 'image/jpeg';
                    } else if (extname === '.png') {
                        contentType = 'image/png';
                    }

                    // Send the image data with the correct content type
                    res.statusCode = 200;
                    res.setHeader('Content-Type', contentType);
                    res.end(data);
                });
            } else {
                // If image not found, respond with a 404 error
                res.statusCode = 404;
                res.end('404 Not Found');
            }
        });
    } else {
        // If the URL doesn't match any known path, return a 404 error
        res.statusCode = 404;
        res.end('404 Not Found');
    }
});

// Set the port for the server to listen on
const port = 3000;
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
