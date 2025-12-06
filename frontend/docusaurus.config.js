const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Physical AI & Humanoid Robotics",
  tagline: "The Future Is Embodied",
  favicon: "/img/favicon.ico",

  url: "https://your-docusaurus-site.example.com",
  baseUrl: "/",

  organizationName: "panaversity",
  projectName: "physical-ai-humanoid-robotics",

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          editUrl:
            "https://github.com/panaversity/physical-ai-humanoid-robotics/tree/main/",
          showLastUpdateAuthor: false,
          showLastUpdateTime: false,
          breadcrumbs: true,
        },
        blog: {
          showReadingTime: true,
          editUrl:
            "https://github.com/panaversity/physical-ai-humanoid-robotics/tree/main/",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      },
    ],
  ],

  themeConfig: {
    image: "img/docusaurus-social-card.svg",
    navbar: {
      title: "Physical AI & Humanoid Robotics",
      logo: {
        alt: "Physical AI & Humanoid Robotics Logo",
        src: "img/favicon.ico",
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "tutorialSidebar",
          position: "left",
          label: "Book",
        },
        { to: "/blog", label: "Blog", position: "left" },
        {
          href: "https://ai-native.panaversity.org/docs/preface-agent-native",
          label: "AI Agent Book",
          position: "left",
        },
        {
          href: "https://github.com/panaversity/physical-ai-humanoid-robotics",
          label: "GitHub",
          position: "right",
        },
      ],
    },

    footer: {
      style: "dark",
      links: [
        {
          title: "Docs",
          items: [
            {
              label: "Book",
              to: "/docs/intro",
            },
            {
              label: "Modules",
              to: "/docs/category/module-1-the-robotic-nervous-system-ros-2",
            },
          ],
        },
        {
          title: "Community",
          items: [
            {
              label: "AI Agent Book",
              href: "https://ai-native.panaversity.org/docs/preface-agent-native",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "Blog",
              to: "/blog",
            },
            {
              label: "Contact Us",
              href: "mailto:mubashirkhi72@gmail.com",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Physical AI & Humanoid Robotics. Built with Docusaurus.`,
    },

    prism: {
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme,
    },
  },
};

module.exports = config;