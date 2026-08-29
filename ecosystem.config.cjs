/**
 * PM2 process definition for the production server.
 *
 *   pm2 start ecosystem.config.cjs
 *   pm2 save && pm2 startup      # survive a reboot
 *   pm2 logs agba
 *
 * PM2 keeps the Node process alive and restarts it on crash or reboot, which
 * is what turns `npm start` into something you can actually leave running.
 */
module.exports = {
  apps: [
    {
      name: "agba",
      script: "node_modules/next/dist/bin/next",
      args: "start",
      cwd: __dirname,
      instances: 1,
      // SQLite is a single writer — do NOT switch this to cluster mode, or
      // two processes will fight over the database file.
      exec_mode: "fork",
      autorestart: true,
      max_memory_restart: "512M",
      env: {
        NODE_ENV: "production",
        PORT: "3009",
      },
      error_file: "logs/agba-error.log",
      out_file: "logs/agba-out.log",
      time: true,
    },
  ],
};
