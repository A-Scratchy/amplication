module.exports = {
  title: 'Amplication Docs',
  tagline: 'Welcome to the Amplication documentation',
  url: 'https://amplication.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  favicon: 'img/favicon.ico',
  organizationName: 'amplicaiton/amplication', // Usually your GitHub org/user name.
  projectName: 'amplication', // Usually your repo name.
  themeConfig: {
    
    colorMode: {
      // "light" | "dark"
      defaultMode: 'light',
      // Hides the switch in the navbar
      disableSwitch: true,
    },
    navbar: {
      hideOnScroll: true,
      title: '',
      logo: {
        alt: 'Amplicaiton',
        src: 'img/amplication-logo.svg',
        href:"https://amplication.com/"
      },
      items: [
        
        {
          href: 'https://github.com/amplicaiton/amplication',
          label: 'GitHub',
          position: 'right',
          activeSidebarClassName: 'yuval'
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Style Guide',
              to: 'docs/',
            },
            {
              label: 'Second Doc',
              to: 'docs/doc2/',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Discord',
              href: 'https://discord.gg/b8MrjU6',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/amplication',
            },
            {
              label: 'Facebook',
              href: 'https://www.facebook.com/amplicationcom/',
            },
            {
              label: 'LinkedIn',
              href: 'https://www.linkedin.com/company/amplication',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: 'blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/amplication/amplication',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} amplication. Built with Docusaurus.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/amplication/docs/edit/main/docs-website/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/amplication/docs/edit/main/docs-website/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
