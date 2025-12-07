from http.server import HTTPServer, SimpleHTTPRequestHandler
import sys
import os

class CORSRequestHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET')
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        return super().end_headers()

if __name__ == '__main__':
    port = 8000
    print(f"Starting server with CORS support on port {port}")
    print(f"Serving directory: {os.getcwd()}")
    try:
        httpd = HTTPServer(('0.0.0.0', port), CORSRequestHandler)
        print(f"Server running at http://localhost:{port}")
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nServer stopped.")
