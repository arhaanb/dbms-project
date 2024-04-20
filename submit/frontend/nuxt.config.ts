// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	ssr: false,
	app: {
		head: {
			title: 'DBMS',
			// meta: [
			//   { charset: "utf-8" },
			//   { name: "viewport", content: "width=device-width, initial-scale=1" },
			//   { name: "author", content: "Arhaan Bahadur" },
			//   { name: "robots", content: "index, follow" },
			//   { name: "googlebot", content: "index, follow" },
			//   {
			//     name: "description",
			//     content:
			//       "Offering premiere language coaching, Deutschlernen is your gateway to fluency in German!",
			//   },
			//   // { name: 'twitter:card', content: 'summary_large_image' },
			//   // { property: 'og:url', content: "https://thefirstdraft.vercel.app" },
			//   { property: "og:type", content: "website" },
			//   { property: "og:title", content: "Deutschlernen — Learn German" },
			//   {
			//     property: "og:description",
			//     content:
			//       "Offering premiere language coaching, Deutschlernen is your gateway to fluency in German!",
			//   },

			//   // {
			//   //      property: 'og:image',
			//   //      content: `https://stepup.vercel.app/${config.seoimage}`
			//   // },
			//   // { property: 'og:image:alt', content: config.title },
			//   // { property: 'og:image:width', content: '1280' },
			//   // { property: 'og:image:height', content: '720' },
			//   { name: "theme-color", content: "#F9F7F1" || false },
			// ],

			link: [
				{
					href: 'https://api.fontshare.com/v2/css?f[]=sentient@2,1&display=swap',
					rel: 'stylesheet'
				},
				{
					href: 'https://api.fontshare.com/v2/css?f[]=satoshi@1,2&display=swap',
					rel: 'stylesheet'
				},
				{
					rel: 'icon',
					type: 'image/svg',
					href: `/logo.svg`
				}
			]
		}
	},
	devtools: { enabled: true },
	modules: [],
	css: ['~/assets/skeleton.css', '~/assets/main.scss']
})
