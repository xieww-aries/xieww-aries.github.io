export type AlbumId = 'travel' | 'city' | 'life';

export interface Album {
	id: AlbumId | 'all';
	name: string;
}

export interface Photo {
	id: string;
	src: string;
	alt: string;
	caption: string;
	date: string;
	album: AlbumId;
}

export const albums: Album[] = [
	{ id: 'all', name: '全部' },
	{ id: 'travel', name: '旅行' },
	{ id: 'city', name: '城市' },
	{ id: 'life', name: '日常' }
];

export const photos: Photo[] = [
	{
		id: 'mountain-ridge',
		src: '/static/album/mountain-ridge.jpg',
		alt: '峡湾边的悬崖',
		caption: '峡湾',
		date: '2024.10',
		album: 'travel'
	},
	{
		id: 'highland-road',
		src: '/static/album/highland-road.jpg',
		alt: '绿丘间的盘山公路',
		caption: '盘山',
		date: '2024.10',
		album: 'travel'
	},
	{
		id: 'snow-camp',
		src: '/static/album/snow-camp.jpg',
		alt: '雪山下的营地',
		caption: '营地',
		date: '2025.01',
		album: 'travel'
	},
	{
		id: 'storm-sea',
		src: '/static/album/storm-sea.jpg',
		alt: '阴云下的海面',
		caption: '海风',
		date: '2025.04',
		album: 'travel'
	},
	{
		id: 'canal',
		src: '/static/album/canal.jpg',
		alt: '运河边的小城',
		caption: '运河',
		date: '2025.04',
		album: 'travel'
	},
	{
		id: 'meadow',
		src: '/static/album/meadow.jpg',
		alt: '通往山顶的草甸小路',
		caption: '草甸',
		date: '2025.06',
		album: 'travel'
	},
	{
		id: 'skyline',
		src: '/static/album/skyline.jpg',
		alt: '城市天际线',
		caption: '天际线',
		date: '2024.12',
		album: 'city'
	},
	{
		id: 'times-square',
		src: '/static/album/times-square.jpg',
		alt: '夜晚的城市广场',
		caption: '广场',
		date: '2024.12',
		album: 'city'
	},
	{
		id: 'night-bridge',
		src: '/static/album/night-bridge.jpg',
		alt: '河边的夜桥',
		caption: '夜桥',
		date: '2025.01',
		album: 'city'
	},
	{
		id: 'raspberries',
		src: '/static/album/raspberries.jpg',
		alt: '一杯覆盆子',
		caption: '覆盆子',
		date: '2025.03',
		album: 'life'
	},
	{
		id: 'kitchen',
		src: '/static/album/kitchen.jpg',
		alt: '厨房案板上的洋葱',
		caption: '厨房',
		date: '2025.03',
		album: 'life'
	},
	{
		id: 'jellyfish',
		src: '/static/album/jellyfish.jpg',
		alt: '水中的水母',
		caption: '水母',
		date: '2025.05',
		album: 'life'
	}
];
