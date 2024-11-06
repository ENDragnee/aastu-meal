#!/bin/bash
# Get the local IP address (assuming it's the first one found in the network interface list)
LOCAL_IP=$(hostname -i | awk '{print $1}')

# Display the local IP address
echo "Your local IP address is: $LOCAL_IP"
# Navigate to your Next.js project directory
cd ~/real/Projects/Work/aastu-meal

# Install dependencies (optional, if needed)
# npm install

# Run the Next.js development server
npm run dev &

# Wait for the server to start (optional: adjust the time if necessary)
sleep 5

# Open the app in the default browser
xdg-open http://localhost:3000/

