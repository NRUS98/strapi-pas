'use strict';

/**
 * `updateAccountAmount` middleware
 */

module.exports = (config, {strapi}) => {
  // Add your own logic here.
  return async (ctx, next) => {
    const method = ctx.request.method;
    const body = ctx.request.body;

    if (method === "POST") {
      const {amount, type, account: accountId} = body.data;

      const account = await strapi.entityService.findOne(
        'api::account.account',
        accountId
      );

      await strapi.entityService.update(
        'api::account.account',
        accountId,
        {
          data: {
            amount: type === "income" ? account.amount + amount : account.amount - amount
          }
        }
      );
    }

    if (method === "DELETE") {
      const transactionId = ctx.params.id;
      const {account, amount, type} = await strapi.entityService.findOne(
        'api::transaction.transaction',
        transactionId,
        {
          populate: '*'
        }
      );
      await strapi.entityService.update(
        'api::account.account',
        account.id,
        {
          data: {
            amount: type === "income"
              ? account.amount - amount
              : account.amount + amount
          }
        }
      );
    }

    await next();
  };
};
