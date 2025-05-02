const { exec, spawn } = require('child_process');
const path = require('path');
const fs = require('fs');
const net = require('net');

// Function to check if a port is in use
function isPortInUse(port) {
  return new Promise((resolve) => {
    const server = net.createServer()
      .once('error', () => {
        // Port is in use
        resolve(true);
      })
      .once('listening', () => {
        // Port is free
        server.close();
        resolve(false);
      })
      .listen(port);
  });
}

// Find an available port starting from the given one
async function findAvailablePort(startPort) {
  let port = startPort;
  while (await isPortInUse(port)) {
    console.log(`Port ${port} is in use, trying ${port + 1}...`);
    port++;
  }
  return port;
}

// Main function to start the development server
async function startDev() {
  // Ensure the scripts directory exists
  const scriptsDir = path.join(__dirname);
  if (!fs.existsSync(scriptsDir)) {
    fs.mkdirSync(scriptsDir, { recursive: true });
  }

  // Find an available port
  const port = await findAvailablePort(3000);
  
  console.log(`Starting development server on port ${port}...`);
  
  // Start Next.js development server with spawn for better process handling
  const nextProcess = spawn('npx', ['next', 'dev', '-p', port.toString()], { 
    stdio: 'inherit',
    shell: true 
  });

  // Wait a moment for the server to start up
  setTimeout(() => {
    // Open the browser
    const openProcess = exec(`open http://localhost:${port}`);
    
    openProcess.stdout?.on('data', (data) => {
      console.log(data.toString());
    });
    
    openProcess.stderr?.on('data', (data) => {
      console.error(data.toString());
    });
  }, 2500);

  // Handle process termination
  process.on('SIGINT', () => {
    nextProcess.kill('SIGINT');
    process.exit();
  });
}

// Start the dev process
startDev().catch(err => {
  console.error('Failed to start development server:', err);
  process.exit(1);
});