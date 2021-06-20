#!/usr/bin/env python3

from http.server import HTTPServer, SimpleHTTPRequestHandler
import ssl
httpd = HTTPServer(("", 8000), SimpleHTTPRequestHandler)
httpd.socket = ssl.wrap_socket(
    httpd.socket,
    keyfile="./server.key",
    certfile='./server.cert',
    server_side=True)
httpd.serve_forever()
