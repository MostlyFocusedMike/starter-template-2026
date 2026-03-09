"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("prisma/config");
require("dotenv/config");
exports.default = (0, config_1.defineConfig)({
    schema: 'src/prisma/schema.prisma',
    migrations: {
        path: 'src/prisma/migrations',
        // obviously you'll need tsx installed
        seed: 'tsx src/prisma/seed.ts',
    },
    datasource: {
        // This is the name of the process.env variable that has the connect string
        url: (0, config_1.env)('DATABASE_URL'),
    },
});
//# sourceMappingURL=prisma.config.js.map