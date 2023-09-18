'use strict';

/**
 * transaction router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::transaction.transaction', {
  config: {
    delete: {
      middlewares: ["api::transaction.update-account-amount"],
    },
    update: {
      middlewares: ["api::transaction.update-account-amount"]
    },
    create: {
      middlewares: ["api::transaction.update-account-amount"]
    }
  }
});
