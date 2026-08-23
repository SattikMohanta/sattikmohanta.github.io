Analytics & Prep Engine Hub — Local Setup
==========================================

Folder contents:
  index.html    Unified hub (tab switcher + iframe viewport)
  ecba.html     IIBA ECBA Interactive Mock Test Portal
  sql.html      Enterprise SQL & Data Analytics Suite
  powerbi.html  Microsoft Power BI Data Analyst Exam Simulator

HOW TO RUN
----------
1. Unzip this folder so all 4 files sit in the same directory.
2. Start a local server from inside that directory (pick one):

   Python 3:
       python3 -m http.server 8000
       -> open http://localhost:8000

   Node.js:
       npx serve .
       -> open the URL it prints (usually http://localhost:3000)

   VS Code:
       Install "Live Server" extension, right-click index.html,
       choose "Open with Live Server".

3. Use the top tab bar to switch between the three apps, or click
   "Open App in New Tab" to open the active one standalone.

NOTE: Opening index.html directly via file:// (double-click) will
NOT work correctly — the iframe tab-switching requires an actual
http:// server due to browser security restrictions on local files.
Always use one of the methods above.
