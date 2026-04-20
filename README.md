# agentic-demo
Agentic Demo, MCP features w/ endpoints

How to execute

# 1️⃣ Start the API
cd agentic/src/api
npm start

# 2️⃣ In another window, run the CLI
cd agentic/src/client
npm start 1   # (or 2 for the other member)
The CLI will display something like:

🔍 Fetching member profile…
• Alice (alice@example.com)
📄 Fetching recommendations…
  1. [Hotel] Grand Plaza – Score: 0.86
  2. [Flight] NYC → LA – Score: 0.92
  3. [Activity] Brewery Tour – Score: 0.78
5. Running the proof‑of‑concept
Clone the repo

git clone https://github.com/themadhacker222/agentic-demo.git
cd agentic-demo
Install dependencies

npm install          # installs express, node-fetch, typescript, etc.
Build (optional, for the TS compilation)

npx tsc            # or simply run `npm start` below if ts-node is used
Start the API

cd src/api
npm start          # listens on port 3000
Run the CLI

cd src/client
npm start 1        # or `npm start 2`



1. High‑level architecture


┌─────────────────────┐          ┌───────────────────────────────┐                                           
│  1) API server (TS) │◄─────────►  2) Minimal CLI client (TS)   │                                           
└─────────────────────┘          └───────────────────────────────┘                                           
          ▲                                   │                                                              
          │                                   │                                                              
          │   (HTTP)  /mcp/get_recommendations                                                               
          │   (HTTP)  /mcp/get_member_profile                                                                
          │                                                                                                  
          └─────────────────────┐                                                                            
                                │  In‑memory data store (JSON files)                                         
                                ▼                                                                            
                         partner‑config.ts                                                                   
                         member‑data.ts                                                                      
                         travel‑data.ts                                                                                                                                                                                    



/mcp/... endpoints – are the MCP (Machine‑Configuration‑Protocol) actions the
agent can discover and invoke.
A client simply calls the endpoint’s URL; no special “mcp‑discover” service needed
for this proof‑of‑concept but the URL prefix makes the intent clear.

Partner config enforcement – the server reads a configuration object that
contains:


Partner	Category	Max‑Per‑Category	Exclusions

TravelCo	Hotel	3	["Airport"]

TravelCo	Flight	5	[]

TravelCo	Activity	2	["Airport"]

The logic will:

Retrieve all itineraries for a member.
Group them by category.
Apply the cap and exclusions.
Return a list of Recommendation objects.
Client – a tiny CLI (using node-fetch) that:

Calls get_member_profile to pull the member’s basic info.
Calls get_recommendations for that member.
Pretty‑prints the result to the console.

How it satisfies the requested spec:
   
Requirement	Implementation
At least one MCP server endpoint:
/mcp/get_recommendations (plus /mcp/get_member_profile)

Partner‑specific rule enforcement:
Partner config (partnerConfig.ts) drives caps & exclusions

Use any language/framework:	
Node.js/TypeScript with Express
Backend API & minimal front‑end/CLI	Express API + Node CLI (cli.ts)

Mock upstream services:	
All data live in local *.ts files

This demo shows a complete end‑to‑end flow: 
the agent (or a developer) can discover the endpoints just by inspecting the base URL, invoke them in any order, and instantly get a list of recommended travel items for a given member. 

The code can be extended to read real databases, add authentication, or replace the CLI with a web UI – all with the same simple architecture.
