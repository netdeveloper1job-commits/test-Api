module.exports = {
  apps: [
    {
      name: "becms-api",
      script: "dist/main.js",
      cwd: "/home/developer/web/becms.labsoft.in",
      instances: 1,
      autorestart: true,
      watch: false,
      env: {
        NODE_ENV: "production",
        PORT: 5000,

        DATABASE_HOST: "127.0.0.1",
        DATABASE_PORT: 3306,
        DATABASE_USERNAME: "developer_cms",
        DATABASE_PASSWORD: "Labcode@98715",
        DATABASE_NAME: "developer_cms",

        MAIL_HOST: "smtp.gmail.com",
        MAIL_PORT: 465,
        MAIL_SECURE: true,
        MAIL_USERNAME: "mg2532179@gmail.com",
        MAIL_PASSWORD: "pdppybayvetxgoic",
      },
    },
  ],
};
