const PROXY_CONFIG = [
    {
        context: [
            "/api/sav"
        ],
        target: "http://10.10.10.103:8081/",
        secure: false,
        logLevel : "debug"
    }
  ]

  module.exports = PROXY_CONFIG;
