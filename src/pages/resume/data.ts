export const profile = {
	name: '谢伟伟',
	title: '前端开发工程师',
	years: '9 年经验',
	location: '上海',
	status: '已离职',
	education: '全日制一本',
	phone: '17621741390',
	email: 'xww3260541@outlook.com',
	intent: {
		type: '全职',
		role: '前端开发'
	}
};

export const skillGroups = [
	{
		label: '语言与框架',
		items: ['JavaScript', 'TypeScript', 'HTML', 'CSS', 'React', 'React Native', 'Redux']
	},
	{
		label: '工程化',
		items: ['Webpack', 'gulp', 'Jest', 'ESLint', 'Prettier', 'Husky', 'CI/CD', 'SSR']
	},
	{
		label: '服务端',
		items: ['Node.js', 'Express', 'Koa', 'Egg']
	}
];

export interface Project {
	name: string;
	period: string;
	summary?: string;
	stack: string[];
	highlights: string[];
}

export interface Job {
	company: string;
	title: string;
	period: string;
	summary: string[];
	projects: Project[];
}

export const jobs: Job[] = [
	{
		company: '京东',
		title: '前端开发工程师',
		period: '2021.10 — 2026.05',
		summary: ['负责日常与大促业务、性能优化、技改，以及低代码平台建设。'],
		projects: [
			{
				name: '京东通天塔低代码主应用',
				period: '2021.10 — 2026.05',
				summary: '面向 C 端的低代码平台主应用，支撑大促与频道活动页。',
				stack: ['React', 'Node.js'],
				highlights: [
					'负责电商大促、频道活动等 C 端页面交付',
					'参与平台化技术方案与业务方案讨论',
					'为开发者提供脚手架，封装通用组件与方法，支持其他业务方接入',
					'推进性能优化与组件重构，并用数据验证效果'
				]
			},
			{
				name: '京东灵活化原子组件库',
				period: '2021.10 — 2026.05',
				summary: '服务大促与频道楼层搭建的原子组件库。',
				stack: ['React', 'Node.js'],
				highlights: [
					'适配组件库，支持大促和频道的多种楼层搭建场景',
					'扩展方法函数，将事件收口到主应用统一处理',
					'封装暗黑模式、RTL、长按看相似、登录、加购等通用能力，下发给各频道活动部门使用',
					'做包体积与图片相关的性能优化'
				]
			},
			{
				name: '京东共建楼层支持',
				period: '2021.10 — 2026.05',
				summary: '维护共建楼层能力，覆盖通信、服务端渲染与开发脚手架。',
				stack: ['React', 'Node.js'],
				highlights: [
					'维护并扩展共建楼层能力，支持楼层通信、SSR、依赖参数等功能',
					'封装通用方法函数，将事件收口到主应用统一处理',
					'维护并升级共建开发脚手架',
					'支持业务埋点与性能埋点，接入监控报警平台',
					'持续跟进性能优化'
				]
			}
		]
	},
	{
		company: '携程旅游',
		title: '高级前端开发工程师',
		period: '2017.08 — 2021.10',
		summary: [
			'对接产品、交互与视觉，完成机票相关业务需求',
			'负责页面性能优化、工程化升级，以及发布、监控与问题排查'
		],
		projects: [
			{
				name: 'trip.com 机票',
				period: '2017.08 — 2021.10',
				summary: 'trip.com/m/flights/ 机票预订站点。',
				stack: ['React', 'Redux', 'TypeScript', 'Node.js', 'Egg', 'Koa', 'SSR', 'Webpack', 'Jest'],
				highlights: [
					'配合产品、交互、视觉与 BI，完成业务开发与升级',
					'页面性能优化，Google PageSpeed 从 28 提升至 89，助力 SEO',
					'升级至 Webpack 4，移除 gulp，缩短构建时间并优化包体积',
					'接入 Jest 单元测试',
					'从 0 到 1 开发 React 移动端公共 UI 组件库'
				]
			},
			{
				name: '携程 App 机票',
				period: '2017.08 — 2021.10',
				summary: '携程 App 机票预订板块，React Native 跨端。',
				stack: ['React Native', 'Redux', 'TypeScript', 'Jest'],
				highlights: [
					'承接机票预订业务，覆盖包机、团体票、学生票验证等页面',
					'接入 ESLint、Prettier、Husky，规范编码与 commit',
					'引入 TypeScript，推进项目架构升级'
				]
			},
			{
				name: 'Travix 合作项目',
				period: '2021.08 — 2021.10',
				summary: '与携程收购的荷兰 OTA Travix 合作，全英文办公环境。',
				stack: ['React', 'Redux', 'TypeScript', 'Jest'],
				highlights: [
					'对接对方 PO / TL，支持完成年度任务',
					'新增活动、城市、国家等相关页面',
					'参与组件库升级与 Code Review',
					'负责资源与应用的发布、监控，跟踪并修复异常指标与报错'
				]
			}
		]
	}
];

export const education = {
	school: '常州大学',
	major: '化学工程与工艺',
	degree: '全日制本科',
	period: '2012.09 — 2016.06'
};
