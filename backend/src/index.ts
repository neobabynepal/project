import type { Core } from '@strapi/strapi';

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   */
  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    try {
      // 1. Ensure required Public permissions are set
      const publicRole = await strapi
        .query('plugin::users-permissions.role')
        .findOne({ where: { type: 'public' }, populate: ['permissions'] });

      if (publicRole) {
        const requiredActions = [
          'api::about.about.find',
          'api::contact-submission.contact-submission.create',
          'api::vacancy.vacancy.find',
          'api::vacancy.vacancy.findOne',
          'api::company.company.find',
          'api::company.company.findOne',
          'api::brand.brand.find',
          'api::brand.brand.findOne',
          'api::news-post.news-post.find',
          'api::news-post.news-post.findOne',
          'api::gallery.gallery.find',
          'api::policy.policy.find',
          'api::policy.policy.findOne',
          'api::chairman-message.chairman-message.find',
          'api::leader.leader.find',
          'api::leader.leader.findOne',
          'api::site-setting.site-setting.find',
          'api::homepage-content.homepage-content.find'
        ];

        const existingActions = new Set(
          (publicRole.permissions || []).map((p: any) => p.action)
        );

        for (const action of requiredActions) {
          if (!existingActions.has(action)) {
            let perm = await strapi
              .query('plugin::users-permissions.permission')
              .findOne({ where: { action } });

            if (!perm) {
              perm = await strapi
                .query('plugin::users-permissions.permission')
                .create({
                  data: {
                    action,
                    role: publicRole.id,
                  },
                });
            } else {
              // Ensure linked to public role
              await strapi.db.query('plugin::users-permissions.permission').update({
                where: { id: perm.id },
                data: {
                  role: publicRole.id,
                },
              });
            }
          }
        }
      }
    } catch (err) {
      strapi.log.warn('Could not auto-configure public permissions in bootstrap:', err);
    }
  },
};
