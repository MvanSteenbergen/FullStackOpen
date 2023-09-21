```mermaid
sequenceDiagram
  participant browser
  participant server

  browser->>server:	POST https://studies.cs.helsinki.fi/exampleapp/new_note
  activate server
  server->>browser: Request to reload page
  deactivate server

  browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
  activate server
  server->>browser: HTML Document
  deactivate server
  
  
```
